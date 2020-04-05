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

    if (!projectRes.ok) res.status(projectRes.status).send(projectRes.statusText);

    let relationship = '';
    let contracts = [];
    const project = await projectRes.json();

    if (project.details.owner.user.username == username) {
      relationship = 'Owner';
      
      const pContractsRes = await fetch(`${BE_ADDR}/projects/${pid}/contracts`, {
        headers: { cookie: req.headers.cookie },
        credentials: 'include'
      });

      if (!pContractsRes.ok) res.status(pContractsRes.status).send(pContractsRes.statusText);

      contracts = await pContractsRes.json();
    } else {
      const myContractsRes = await fetch(`${BE_ADDR}/contracts`, {
        headers: { cookie: req.headers.cookie },
        credentials: 'include'
      });

      if (!myContractsRes.ok) res.status(myContractsRes.status).send(myContractsRes.statusText);
      
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
      res.json({ project, projectId: pid, relationship, contracts });
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
