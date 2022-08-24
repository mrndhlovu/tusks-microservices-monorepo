import styles from './user-avatar.module.scss'

/* eslint-disable-next-line */
export interface UserAvatarProps {}

export function UserAvatar(props: UserAvatarProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UserAvatar!</h1>
    </div>
  )
}

export default UserAvatar
