import Link from 'next/link';
import styles from './home.module.css'; // Importamos el archivo de CSS

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido a los Juegos</h1>
      <h2 className={styles.subtitle}>Selecciona un juego:</h2>
      <ul className={styles.gameList}>
        <li>
          <Link href="/reaction" className={styles.link}>Reaction Time</Link>
        </li>
        <li>
          <Link href="/number" className={styles.link}>Number Memory</Link>
        </li>
        <li>
          <Link href="/sequence" className={styles.link}>Sequence Memory</Link>
        </li>
      </ul>
    </div>
  );
}
