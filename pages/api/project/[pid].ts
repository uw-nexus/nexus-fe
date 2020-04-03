import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';

import { BE_ADDR, formatDateBE } from '../../../utils';

export default async (req, res) => {
  try {
    const {
      cookies: { jwt },
      query: { pid }
    } = req;

    const { username } = jwtDecode(jwt);

    const projectRes = await fetch(`${BE_ADDR}/projects/${pid}`, {
      headers: { cookie: req.headers.cookie },
      credentials: 'include'
    });

    let relationship = '';
    let contracts = [];
    const project = await projectRes.json();

    if (project.details.owner.user.username == username) {
      relationship = 'Owner';
      
      const projectContracts = await fetch(`${BE_ADDR}/projects/${pid}/contracts`, {
        headers: { cookie: req.headers.cookie },
        credentials: 'include'
      });

      contracts = await projectContracts.json();
    } else {
      const myContractsRes = await fetch(`${BE_ADDR}/contracts`, {
        headers: { cookie: req.headers.cookie },
        credentials: 'include'
      });
      
      const myContracts = await myContractsRes.json();
      let statusMappings = {};
      for (let { project: { projectId }, status } of myContracts) {
        statusMappings[projectId] = (status == 'Active') ? 'Member' : status;
        if (projectId == pid) break;
      }

      relationship = (pid in statusMappings) ? statusMappings[pid] : '';
    }

    try {
      project.details.startDate = formatDateBE(project.details.startDate);
      project.details.endDate = formatDateBE(project.details.endDate);
    } finally {
      return res.status(200).json({ project, projectId: pid, relationship, contracts });
    }
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
}
