import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

export const callApi = async (ctx, url) => {
  const res = await fetch(url, (typeof window !== 'undefined')
    ? { credentials: 'include' }
    : {
      headers: { cookie: ctx.req.headers.cookie },
      credentials: 'include'
    });
  
  return res.json();
};

export const checkAuth = async (ctx) => callApi(ctx, 'http://localhost:3000/api/auth');

export const redirectPage = (ctx, dest) => {
  if (typeof window !== 'undefined') {
    Router.push(dest);
  } else {
    ctx.res.writeHead(302, { Location: dest });
    ctx.res.end();
  }
}
