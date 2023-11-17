import '@/styles/globals.css';
import '@/styles/map.css';
import '@/styles/SearchBar.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from '@/utils/create-emotion-cache';

const clientSideEmotionCache = createEmotionCache();
export interface TripTribeAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: TripTribeAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
