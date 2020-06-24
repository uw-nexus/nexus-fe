import { NextApiRequest, NextApiResponse } from 'next';
import { searchProjects } from 'utils/search';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const filters = req.body;
    const projects = await searchProjects(filters);
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
