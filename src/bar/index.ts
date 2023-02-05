import express, { Express } from 'express';

const service_name = 'bar';

function run() {
  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const PORT = 3001;

  app.listen(PORT, () => {
    console.log(`[${service_name}] Server running on port ${PORT}`);
  });
}

// export default { run };
export { run };
