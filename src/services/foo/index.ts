import express, { Express } from 'express';
import find from 'find-process';

import router from './routes/index.routes';

const service_name = 'foo';

async function run() {
  await waitForPostgres();
  await waitForRedis();

  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const HOSTNAME = 'localhost';
  const PORT = 3000;

  app.listen(PORT, HOSTNAME, () => {
    console.log(`[${service_name}] Server running on port http://${HOSTNAME}:${PORT}`);
  });

  process.on('exit', (code) => {
    console.log(`[${service_name}] About to exit with code: ${code}`);
  });

  app.use('/', router);
}

const timeout = (time: number, label: string) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(`[${label}] ${time} ms elapsed`);
      resolve(true);
    }, time)
  );

async function isReady(port_num: number) {
  const PORT_LABEL_MAP = {
    5432: 'Postgres',
    6379: 'redis-server',
  };

  try {
    const proc = await find('port', port_num);

    if (proc.length > 0) {
      return proc.every((p) => p.name === (PORT_LABEL_MAP as any)[port_num]);
    }

    return false;
  } catch (err) {
    console.error(err);
    throw new Error('unexpected error');
  }
}

async function waitForPostgres() {
  while (!(await isReady(5432))) {
    await timeout(1000, 'postgres');
  }

  return;
}

async function waitForRedis() {
  while (!(await isReady(6379))) {
    await timeout(1000, 'redis');
  }
}

export { run };
