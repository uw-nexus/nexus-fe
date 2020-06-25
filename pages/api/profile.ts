import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';
import { BE_ADDR } from 'utils';
import initCors from 'utils/middleware';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await initCors(req, res);

  try {
    const { jwt } = req.cookies;
    const { username } = jwtDecode(jwt);

    const response = await fetch(`${BE_ADDR}/students/${username}`, {
      headers: { cookie: req.headers.cookie },
      credentials: 'include',
    });

    if (!response.ok) return res.status(response.status).send(response.statusText);

    const profile = await response.json();
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
