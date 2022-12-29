import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import { UserProvider } from 'providers/UserProvider';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
