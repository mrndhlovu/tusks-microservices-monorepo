import styles from './board-member-card.module.scss'

/* eslint-disable-next-line */
export interface BoardMemberCardProps {}

export function BoardMemberCard(props: BoardMemberCardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BoardMemberCard!</h1>
    </div>
  )
}

export default BoardMemberCard
