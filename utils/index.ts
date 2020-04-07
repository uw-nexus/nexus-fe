import Router from 'next/router';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

export const {
  publicRuntimeConfig: { BE_ADDR, FE_ADDR },
} = getConfig();

export const callApi = async (ctx, url): Promise<any> => {
  const res = await fetch(
    url,
    typeof window !== 'undefined'
      ? { credentials: 'include' }
      : {
          headers: { cookie: ctx.req.headers.cookie },
          credentials: 'include',
        },
  );

  if (res.ok) return res.json();
  else throw new Error(`API error at ${url}, ${res.status} ${res.statusText}`);
};

export const checkAuth = async (ctx): Promise<{ authenticated: boolean }> => callApi(ctx, `${FE_ADDR}/api/auth`);

export const redirectPage = (ctx, dest): void => {
  if (typeof window !== 'undefined') {
    Router.push(dest);
  } else {
    ctx.res.writeHead(302, { Location: dest });
    ctx.res.end();
  }
};

export const formatDateBE = (dateStr): string => (dateStr ? new Date(dateStr).toISOString().split('T')[0] : null);
export const formatDateFE = (dateStr): string => (dateStr ? new Date(dateStr).toLocaleString().split(',')[0] : 'N/A');
