import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';

import { BE_ADDR, formatDateBE } from 'utils';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const {
      cookies: { jwt },
      query: { pid },
    } = req;

    const { username } = jwtDecode(jwt);

    const projectRes = await fetch(`${BE_ADDR}/projects/${pid}`, {
      headers: { cookie: req.headers.cookie },
      credentials: 'include',
    });

    if (!projectRes.ok) res.status(projectRes.status).send(projectRes.statusText);

    let relationship = '';
    let contracts = [];
    const project = await projectRes.json();

    if (project.details.owner.user.username === username) {
      relationship = 'Owner';

      const pContractsRes = await fetch(`${BE_ADDR}/projects/${pid}/contracts`, {
        headers: { cookie: req.headers.cookie },
        credentials: 'include',
      });

      if (!pContractsRes.ok) res.status(pContractsRes.status).send(pContractsRes.statusText);

      contracts = await pContractsRes.json();
    } else {
      const myContractsRes = await fetch(`${BE_ADDR}/contracts`, {
        headers: { cookie: req.headers.cookie },
        credentials: 'include',
      });

      if (!myContractsRes.ok) res.status(myContractsRes.status).send(myContractsRes.statusText);

      const myContracts = await myContractsRes.json();
      const statusMappings = new Map();

      for (const {
        project: { projectId },
        status,
      } of myContracts) {
        statusMappings.set(projectId, status === 'Active' ? 'Member' : status);
        if (projectId === pid) break;
      }

      relationship = statusMappings.has(pid) ? statusMappings.get(pid) : '';
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
};
