import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';

export default async (req, res) => {
  try {
    const {
      cookies: { jwt },
      query: { pid }
    } = req;

    const { username } = jwtDecode(jwt);

    const projectRes = await fetch(`${process.env.BE_ADDR}/projects/${pid}`, {
      headers: { cookie: req.headers.cookie },
      credentials: 'include'
    });

    const project = await projectRes.json();
    const isOwner = project.details.owner.user.username == username;

    const contractsRes = await fetch(`${process.env.BE_ADDR}/contracts`, {
      headers: { cookie: req.headers.cookie },
      credentials: 'include'
    });
    
    const contracts = await contractsRes.json();
    const joined = contracts.map(({ project }) => project.id).includes(pid);

    return res.status(200).json({ project, isOwner, joined });

  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
}
