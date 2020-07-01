import { NextApiRequest, NextApiResponse } from 'next';
import { searchStudents } from 'utils/search';
import initCors from 'utils/middleware';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await initCors(req, res);

  try {
    const { filters, page } = req.body;
    const students = await searchStudents(filters, page);
    res.json(students);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
