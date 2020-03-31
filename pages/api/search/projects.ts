import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  try {
    const projectsRes = await fetch(`${process.env.BE_ADDR}/projects/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.cookie
      },
      credentials: 'include',
      body: JSON.stringify({})
    });

    const projects = await projectsRes.json();
    return res.status(200).json(projects);

  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
}
