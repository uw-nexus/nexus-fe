import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { FE_ADDR, DOMAIN } from 'utils';

const corsFn = cors({ credentials: true, origin: [FE_ADDR, `https://${DOMAIN}`] });

export default function initCors(req: NextApiRequest, res: NextApiResponse): Promise<unknown> {
  return new Promise((resolve, reject) => {
    corsFn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
