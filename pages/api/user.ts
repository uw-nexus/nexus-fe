import { NextApiRequest, NextApiResponse } from 'next';
import jwtDecode from 'jwt-decode';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    cookies: { jwt },
  } = req;

  try {
    res.json(jwtDecode(jwt));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
