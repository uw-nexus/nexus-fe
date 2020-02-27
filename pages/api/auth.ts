import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  try {
    const authRes = await fetch(`${process.env.BE_ADDR}/auth/verify`, {
      headers: { cookie: req.headers.cookie },
      credentials: 'include'
    });
    
    return res.status(200).json({ authenticated: authRes.ok });
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
}
