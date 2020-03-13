import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../static/theme';
import Navbar from '../components/Navbar';

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Navbar />
      </ThemeProvider>
    );
  }
}