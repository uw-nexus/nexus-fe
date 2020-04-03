import Router from 'next/router';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

export const {
  publicRuntimeConfig: { BE_ADDR, FE_ADDR }
} = getConfig();

export const callApi = async (ctx, url) => {
  const res = await fetch(url, (typeof window !== 'undefined')
    ? { credentials: 'include' }
    : {
      headers: { cookie: ctx.req.headers.cookie },
      credentials: 'include'
    });
  
  return res.json();
};

export const checkAuth = async (ctx) => callApi(ctx, `${FE_ADDR}/api/auth`);

export const redirectPage = (ctx, dest) => {
  if (typeof window !== 'undefined') {
    Router.push(dest);
  } else {
    ctx.res.writeHead(302, { Location: dest });
    ctx.res.end();
  }
}

export const formatDateBE = (dateStr) => dateStr ? new Date(dateStr).toISOString().split('T')[0] : null;
export const formatDateFE = (dateStr) => dateStr ? new Date(dateStr).toLocaleString().split(',')[0] : 'N/A';
