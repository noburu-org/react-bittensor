import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../src/util/createEmotionCache';
import darkTheme from '../src/styles/theme/darkTheme';
import '../src/styles/globals.css';
import { BittensorProvider } from '../src/context/BittensorProvider/BittensorProvider';


const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={darkTheme}>
        <BittensorProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </BittensorProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;