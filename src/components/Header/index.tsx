import Link from 'next/Link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <Link href="/">
      <header className={styles.header}>
        <img src="../assets/images/Logo.svg" className={styles.logo} alt="logo" />
      </header>
    </Link>
  )
}
