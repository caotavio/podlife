import format from 'date-fns/format';
import enCA from 'date-fns/locale/en-CA';
import styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEEE, MMM d', {
    locale: enCA
  });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcast"/>

      <p>The best for you to listen, always</p>

      <span>{currentDate}</span>
    </header>
  );
}