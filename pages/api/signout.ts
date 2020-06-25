import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { DOMAIN } from 'utils';
import initCors from 'utils/middleware';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await initCors(req, res);

  const prodSettings = {
    sameSite: 'None',
    secure: true,
    httpOnly: true,
    path: '/',
    domain: DOMAIN,
  };

  const cookieSerialized = cookie.serialize(
    'jwt',
    '',
    process.env.NODE_ENV === 'production' ? prodSettings : { path: '/' },
  );

  res.setHeader('Set-Cookie', cookieSerialized);
  res.status(200).end();
};
