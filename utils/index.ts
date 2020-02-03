import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

export const checkAuth = async (ctx) => {
  const res = await fetch('http://localhost:3000/api/auth', (typeof window !== 'undefined')
    ? { credentials: 'include' }
    : {
      headers: { cookie: ctx.req.headers.cookie },
      credentials: 'include'
    });
  
  return res.json();
}

export const redirectPage = (ctx, dest) => {
  if (typeof window !== 'undefined') {
    Router.push(dest);
  } else {
    ctx.res.writeHead(302, { Location: dest });
    ctx.res.end();
  }
}
