import { NextApiRequest, NextApiResponse } from 'next';
import { searchStudents } from 'utils/search';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const filters = req.body;
    const students = await searchStudents(filters);
    res.json(students);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
