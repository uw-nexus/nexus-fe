import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';

export default async (req, res) => {
  try {
    const {
      body: { projectId, startDate, endDate },
      cookies: { jwt }
    } = req;

    const { username } = jwtDecode(jwt);

    const contractRes = await fetch(`${process.env.BE_ADDR}/contracts`, {
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
    
    const { contractId } = await contractRes.json();
    return res.status(200).json({ contractId });

  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
}
