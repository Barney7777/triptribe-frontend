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

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <SnackbarProvider maxSnack={3}>
            {getLayout(<Component {...pageProps} />)}
          </SnackbarProvider>
        </UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
