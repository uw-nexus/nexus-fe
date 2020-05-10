import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';
import { BE_ADDR } from 'utils';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    body: { filters, lastId, lastScore },
    cookies: { jwt },
    query: { entity },
  } = req;

  const { username } = jwtDecode(jwt);

  try {
    const response = await fetch(`${BE_ADDR}/search/${entity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.cookie,
      },
      credentials: 'include',
      body: JSON.stringify({ filters, lastId, lastScore }),
    });

    if (!response.ok) return res.status(response.status).send(response.statusText);
    let arr = await response.json();

    if (entity === 'students') arr = arr.filter(({ profile }) => profile.user.username !== username);
    res.json(arr);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
