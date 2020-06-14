import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';
import { BE_ADDR } from 'utils';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const {
      body: { projectId },
      cookies: { jwt },
    } = req;

    const { username } = jwtDecode(jwt);

    const response = await fetch(`${BE_ADDR}/contracts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.cookie,
      },
      credentials: 'include',
      body: JSON.stringify({ projectId, studentUsername: username }),
    });

    if (!response.ok) return res.status(response.status).send(response.statusText);
    const { contractId } = await response.json();
    res.json({ contractId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
