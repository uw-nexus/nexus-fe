import { NextApiRequest, NextApiResponse } from 'next';
import { searchProjects } from 'utils/search';
import initCors from 'utils/middleware';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await initCors(req, res);

  try {
    const { filters, page } = req.body;
    const projects = await searchProjects(filters, page);
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
