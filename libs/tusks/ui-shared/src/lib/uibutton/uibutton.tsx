import styles from './uibutton.module.scss'

/* eslint-disable-next-line */
export interface UIButtonProps {}

export function UIButton(props: UIButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UIButton!</h1>
    </div>
  )
}

export default UIButton
