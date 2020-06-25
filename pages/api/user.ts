import { NextApiRequest, NextApiResponse } from 'next';
import jwtDecode from 'jwt-decode';
import initCors from 'utils/middleware';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    cookies: { jwt },
  } = req;

  await initCors(req, res);

  try {
    res.json(jwtDecode(jwt));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
