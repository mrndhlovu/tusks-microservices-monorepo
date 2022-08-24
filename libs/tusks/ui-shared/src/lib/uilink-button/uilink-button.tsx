import styles from './uilink-button.module.scss'

/* eslint-disable-next-line */
export interface UILinkButtonProps {}

export function UILinkButton(props: UILinkButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UILinkButton!</h1>
    </div>
  )
}

export default UILinkButton
