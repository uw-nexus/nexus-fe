import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';

import { BE_ADDR } from 'utils';

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

    let isConnected = false;
    let isOwner = false;
    let contracts = [];
    const project = await projectRes.json();

    if (project.details.owner.user.username === username) {
      isOwner = true;
      isConnected = true;

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

      for (const {
        project: { projectId },
      } of myContracts) {
        if (String(projectId) === pid) {
          isConnected = true;
          break;
        }
      }
    }

    res.json({ project, projectId: pid, contracts, isOwner, isConnected: isConnected });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
