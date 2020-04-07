import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';

import theme from 'public/static/theme';
import { RenderPageResult } from 'next/dist/next-server/lib/utils';

export default class extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const styledComponentSheet = new ServerStyleSheet();
    const muiStyleSheet = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
        originalRenderPage({
          enhanceApp: (App) => (props): JSX.Element =>
            styledComponentSheet.collectStyles(muiStyleSheet.collect(<App {...props} />)),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <React.Fragment key="styles">
            {initialProps.styles}
            {muiStyleSheet.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      styledComponentSheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta name="description" content="Projects platform between non-profit organizations (NPO) and students" />
          <meta name="theme-color" content={theme.palette.primary.main} />

          <link rel="manifest" href="/static/manifest.json" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
          />

          <style>
            {`
              html,
              body {
                height: 100%;
                width: 100%;
              }
              *,
              *:after,
              *:before {
                box-sizing: border-box;
              }
              body {
                font-family: Roboto, Helvetica, Arial, sans-serif;
                font-size: 1rem;
                margin: 0;
                background-color: rgb(245, 245, 245);
                position: fixed;
              }
              #__next {
                height: 100%;
                overflow: auto;
              }
              ::-webkit-scrollbar {
                width: 0px;
                background: transparent;
              }
              main {
                margin-bottom: 4rem;
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
