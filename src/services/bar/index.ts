import express, { Express } from 'express';

const service_name = 'bar';

function run() {
  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const HOSTNAME = 'localhost';
  const PORT = 3001;

  app.listen(PORT, HOSTNAME, () => {
    console.log(`[${service_name}] Server running on port http://${HOSTNAME}:${PORT}`);
  });

  process.on('exit', (code) => {
    console.log(`[${service_name}]  About to exit with code: ${code}`);
  });
}

// export default { run };
export { run };
