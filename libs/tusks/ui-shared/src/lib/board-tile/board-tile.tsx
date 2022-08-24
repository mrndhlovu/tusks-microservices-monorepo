import styles from './board-tile.module.scss'

/* eslint-disable-next-line */
export interface BoardTileProps {}

export function BoardTile(props: BoardTileProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BoardTile!</h1>
    </div>
  )
}

export default BoardTile
