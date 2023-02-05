import express, { Express } from 'express';

const service_name = 'foo';

function run() {
  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`[${service_name}] Server running on port ${PORT}`);
  });
}

export { run };
