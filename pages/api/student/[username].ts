import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import { BE_ADDR } from 'utils';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const {
      query: { username },
    } = req;

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
