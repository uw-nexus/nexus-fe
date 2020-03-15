import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';

export default async (req, res) => {
  try {
    const { jwt } = req.cookies;
    const { username } = jwtDecode(jwt);

    const profileRes = await fetch(`${process.env.BE_ADDR}/students/${username}`, {
      headers: { cookie: req.headers.cookie },
      credentials: 'include'
    });

    const profile = await profileRes.json();
    return res.status(200).json(profile);

  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
}
