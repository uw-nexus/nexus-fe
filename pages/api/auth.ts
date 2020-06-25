import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import { BE_ADDR } from 'utils';
import initCors from 'utils/middleware';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await initCors(req, res);

  try {
    const response = await fetch(`${BE_ADDR}/auth/verify`, {
      headers: { cookie: req.headers.cookie },
      credentials: 'include',
    });

    res.json({ authenticated: response.ok });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
