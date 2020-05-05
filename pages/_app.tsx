import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from 'public/static/theme';

export default ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${1 * vh}px`);

    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${1 * vh}px`);
    });
  }, []);

  return (
    <>
      <Head>
        <title>NEXUS App</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};
