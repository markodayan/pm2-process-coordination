import { Request, Response } from 'express';
import find from 'find-process';

async function isRunningOnPort(req: Request, res: Response) {
  const number = +req.params.number;

  if (isNaN(number as number)) {
    return res.status(400).send('Invalid port number supplied');
  }

  try {
    const proc = await find('port', number);
    return res.status(200).json(proc);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export { isRunningOnPort };
