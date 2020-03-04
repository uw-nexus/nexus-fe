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

    let relationship = '';
    const project = await projectRes.json();

    if (project.details.owner.user.username == username) {
      relationship = 'Owner';
    } else {
      const contractsRes = await fetch(`${process.env.BE_ADDR}/contracts`, {
        headers: { cookie: req.headers.cookie },
        credentials: 'include'
      });
      
      const contracts = await contractsRes.json();
      let statusMappings = {};
      for (let { project: { id }, status } of contracts) {
        statusMappings[id] = (status == 'Active') ? 'Member' : status;
        if (id == pid) break;
      }

      relationship = (pid in statusMappings) ? statusMappings[pid] : '';
    }

    return res.status(200).json({ project, projectId: pid, relationship });

  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
}
