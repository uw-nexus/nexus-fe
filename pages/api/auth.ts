import fetch from 'isomorphic-unfetch';
import { BE_ADDR } from '../../utils';

export default async (req, res) => {
  try {
    const response = await fetch(`${BE_ADDR}/auth/verify`, {
      headers: { cookie: req.headers.cookie },
      credentials: 'include'
    });
    
    res.json({ authenticated: response.ok });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
