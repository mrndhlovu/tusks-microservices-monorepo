import styles from './auth-form-wrapper.module.scss'

/* eslint-disable-next-line */
export interface AuthFormWrapperProps {}

export function AuthFormWrapper(props: AuthFormWrapperProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AuthFormWrapper!</h1>
    </div>
  )
}

export default AuthFormWrapper
