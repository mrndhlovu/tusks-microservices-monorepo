import { useRouter } from 'next/router';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useAuth, useGlobalState } from '../../lib/providers';
import { ROUTES } from '../../util/constants';
import Header from '../header/Header';
import ModeSwitch from './ModeSwitch';

export const siteTitle = 'Trello clone';

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { darkMode } = useGlobalState();
  const [mounted, setMounted] = useState<boolean>(false);

  const sessionRef = useRef(() => {
    router.push(`/${ROUTES.login}`);
  });

  useEffect(() => {
    darkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');
  }, [darkMode]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!window) return;
    window.addEventListener('SESSION_EXPIRED', sessionRef.current);
  }, []);

  return (
    <div className="layout">
      <Header />
      {children}
      {mounted && <ModeSwitch />}
    </div>
  );
};

export default Layout;
