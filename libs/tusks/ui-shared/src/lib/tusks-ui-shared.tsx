import styles from './tusks-ui-shared.module.scss';

/* eslint-disable-next-line */
export interface TusksUiSharedProps {}

export function TusksUiShared(props: TusksUiSharedProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TusksUiShared!</h1>
    </div>
  );
}

export default TusksUiShared;
