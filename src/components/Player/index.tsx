import styles from './styles.module.scss';

export function Player() {  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Playing now"/>
        <strong>Playing now</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Select a cool podcast for you to listen!</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="Shuffle"/>
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="Play previous"/>
          </button>
          <button className={styles.playButton} type="button">
            <img src="/play.svg" alt="Play"/>
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="Play next"/>
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repeat"/>
          </button>
        </div>
      </footer>
    </div>
  );
}