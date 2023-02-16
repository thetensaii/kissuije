import 'react-toastify/dist/ReactToastify.min.css';
import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import { GameRoomProvider } from 'providers/GameRoomProvider';
import { Layout } from 'components/molecule/Layout';
import { toast, ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <GameRoomProvider>
      <Layout>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
        <Component {...pageProps} />
      </Layout>
    </GameRoomProvider>
  );
}
