import { NextApiResponse } from 'next';
import cookie from 'cookie';
import { DOMAIN } from 'utils';

export default async (_, res: NextApiResponse): Promise<void> => {
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
