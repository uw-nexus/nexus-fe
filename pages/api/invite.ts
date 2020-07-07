import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import { BE_ADDR } from 'utils';
import initCors from 'utils/middleware';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await initCors(req, res);

  try {
    const {
      body: { recipient },
    } = req;

    const response = await fetch(`${BE_ADDR}/contracts/invites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.cookie,
      },
      credentials: 'include',
      body: JSON.stringify({ recipient }),
    });

    if (!response.ok) return res.status(response.status).send(response.statusText);
    const { inviteId } = await response.json();
    res.json({ inviteId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
