import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';
import { BE_ADDR } from '../../utils';

export default async (req, res) => {
  try {
    const {
      body: { projectId, startDate, endDate },
      cookies: { jwt }
    } = req;

    const { username } = jwtDecode(jwt);

    const response = await fetch(`${BE_ADDR}/contracts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.cookie
      },
      credentials: 'include',
      body: JSON.stringify({
        project: { projectId },
        student: { user: { username } },
        startDate,
        endDate
      })
    });

    if (!response.ok) return res.status(response.status).send(response.statusText);
    
    const { contractId } = await response.json();
    res.json({ contractId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
