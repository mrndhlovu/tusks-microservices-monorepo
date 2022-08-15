import router from 'next/router';
import {
  createContext,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ROUTES } from '../../util/constants';
import { IUIRequestError, useGlobalState } from './GlobalContextProvider';
import {
  apiClient,
  ICodeVerification,
  ILoginCredentials,
  IPasswordConfirmation,
  ISignupCredentials,
} from '../../api';
import { IPowerUp } from '../../components/profile/powerups/PowerUps';

interface IProps {
  children: ReactNode;
}

export interface IAccountFields {
  expired?: boolean;
  expiresAt?: string;
  id: string;
  isTrial: boolean;
  isVerified: boolean;
  plan: string;
  status: string;
  email?: string;
  customerId?: string;
  powerUps?: IPowerUp[];
}

interface IUserBoardRoles {
  [key: string]: string[];
}

export interface IUser {
  avatar?: string;
  bio?: string;
  email: string;
  firstName?: string;
  initials?: string;
  lastName?: string;
  loginTypes?: 'email' | 'username';
  account: IAccountFields;
  boardIds: string[];
  roles: IUserBoardRoles[];
  username: string;
  viewedRecent?: string[];
  workspaces: string[];
  starredBoards: string[];
  multiFactorAuth: boolean;
  permissionFlag: number;
  id: string;
  fullName: string;
  isVerified: boolean;
}

const AuthContextProvider = ({ children }: IProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  const [authError, setAuthError] = useState<IUIRequestError | null>();

  const rehydrateUser = useCallback((newUser?: IUser) => {
    const authenticated = Boolean(newUser?.email);

    setUser(newUser);
    setIsAuthenticated(authenticated);

    if (!authenticated) return router.push(ROUTES.login);
  }, []);

  const signup = useCallback(async formData => {
    setLoading(true);

    await apiClient
      .signupUser(formData)
      .then(() => router.push(`/${ROUTES.verify}?isNew=true`))
      .catch(error => setAuthError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const verifyUserPassword = async (formData: IPasswordConfirmation) => {
    const body = {
      ...formData,
      identifier: user.email,
    };
    return await apiClient
      .verifyUserCredentials(body)
      .then(res => res.status)
      .catch(() => null)
      .finally(() => setLoading(false));
  };

  const login = useCallback(async formData => {
    setLoading(true);

    await apiClient
      .loginUser(formData)
      .then(res => {
        rehydrateUser(res.data);
        if (res.data.multiFactorAuth) {
          router.push(`/${ROUTES.mfa}`);
        }
        return router.push(ROUTES.home);
      })
      .catch(error => setAuthError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const fetchUser = useCallback(async () => {
    await apiClient
      .getCurrentUser()
      .then(res => rehydrateUser(res.data))
      .catch(() => null);
  }, [rehydrateUser]);

  const verifyLogin = useCallback(
    async (data: ICodeVerification, token: string) => {
      setLoading(true);

      await apiClient
        .verifyOtp(data, token)
        .then(() => router.push(ROUTES.home))
        .catch(error => setAuthError(error.message))
        .finally(() => setLoading(false));
    },
    [],
  );

  const requestNewVerificationCode = useCallback(
    async (data: { email: string }) => {
      await apiClient
        .requestNewOtp(data)
        .then(res => res.data)
        .catch(() => rehydrateUser())
        .finally(() => setLoading(false));
    },
    [rehydrateUser],
  );

  const dismissAuthError = () => setAuthError(null);

  const handleStarBoard = useCallback(
    async (boardId: string) => {
      const update = {
        starredBoards: user?.starredBoards?.includes(boardId)
          ? user?.starredBoards.filter(id => id !== boardId)
          : [...user!?.starredBoards, boardId],
      };

      const response = await apiClient.handleUpdateUser(update);
      if (!response) return;

      rehydrateUser(response.data);
    },
    [rehydrateUser, user],
  );

  const logout = useCallback(
    async (allSessions: boolean) => {
      setLoading(true);

      if (allSessions) {
        await apiClient
          .logoutAllSessions()
          .then(() => rehydrateUser())
          .catch(error => {
            rehydrateUser();
          })
          .finally(() => {
            return setLoading(false);
          });

        return;
      }
      await apiClient
        .logoutUser()
        .then(() => rehydrateUser())
        .catch(error => {
          rehydrateUser();
        })
        .finally(() => {
          return setLoading(false);
        });
    },
    [rehydrateUser],
  );

  useEffect(() => {
    return () => {
      return setLoading(false);
    };
  }, []);

  console.log({ user });

  return (
    <AuthContext.Provider
      value={{
        authError,
        dismissAuthError,
        fetchUser,
        isAuthenticated,
        loading,
        login,
        logout,
        handleStarBoard,
        requestNewVerificationCode,
        rehydrateUser,
        signup,
        user,
        verifyLogin,
        verifyUserPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

interface IDefaultAuthContext {
  loading: boolean;
  user?: IUser;
  isAuthenticated: boolean;
  rehydrateUser: (newUser?: IUser) => void;
  logout: (allSessions?: boolean) => {} | void | null;
  login: (formData: ILoginCredentials) => Promise<void>;
  dismissAuthError: () => void;
  signup: (formData: ISignupCredentials) => Promise<void>;
  requestNewVerificationCode: ({ email: string }) => void;
  fetchUser: () => Promise<void>;
  authError: undefined | IUIRequestError;
  verifyLogin: (formData: ICodeVerification, token: string) => Promise<void>;
  verifyUserPassword: (data: IPasswordConfirmation) => Promise<number | null>;
  handleStarBoard: (boardId: string) => void;
}

const AuthContext = createContext<IDefaultAuthContext>(
  {} as IDefaultAuthContext,
);

export const useAuth = () => useContext(AuthContext);
export { AuthContextProvider };
