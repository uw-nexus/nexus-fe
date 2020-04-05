import fetch from 'isomorphic-unfetch';
import { BE_ADDR } from '../../../utils';

export default async (req, res) => {
  try {
    const response = await fetch(`${BE_ADDR}/projects/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.cookie
      },
      credentials: 'include',
      body: JSON.stringify({})
    });

    if (!response.ok) return res.status(response.status).send(response.statusText);
    
    const projects = await response.json();
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
