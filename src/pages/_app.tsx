import '@/styles/globals.css';
import '@/styles/map.css';
import '@/styles/SearchBar.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import type { EmotionCache } from '@emotion/react';
import 'photoswipe/style.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CacheProvider } from '@emotion/react';
import { UserProvider } from '@/contexts/user-context/user-provider';
import { SnackbarProvider } from 'notistack';
import createEmotionCache from '@/utils/create-emotion-cache';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '@/utils/apollo-client';
import { HelmetProvider } from 'react-helmet-async';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
const clientSideEmotionCache = createEmotionCache();
export interface TripTribeAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: TripTribeAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const client = createApolloClient();
  const helmetContext = {};

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>
            <HelmetProvider context={helmetContext}>
              <SnackbarProvider maxSnack={3}>
                {getLayout(<Component {...pageProps} />)}
              </SnackbarProvider>
            </HelmetProvider>
          </UserProvider>
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
