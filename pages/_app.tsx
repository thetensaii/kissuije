import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import { UserProvider } from 'providers/UserProvider';
import { GameRoomProvider } from 'providers/RoomSocketProvider';
import { Layout } from 'components/molecule/Layout';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserProvider>
      <GameRoomProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GameRoomProvider>
    </UserProvider>
  );
}
