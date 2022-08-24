import styles from './user-action.module.css'

/* eslint-disable-next-line */
export interface UserActionProps {}

export function UserAction(props: UserActionProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UserAction!</h1>
    </div>
  )
}

export default UserAction
