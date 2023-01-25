import Head from 'next/head';
import { Header } from '../Header';
import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>Kissuije - Jeu Gratuit Multijoueur de Devinettes & Déduction</title>
        <meta
          name="description"
          content="Kissuije (Qui suis-je ?) est un jeu de devinettes multijoueur gratuit. Devinez et déduisez le personnage que vous avez avant que les autres joueurs trouvent les leur !"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.container}>{children}</main>
    </>
  );
};
