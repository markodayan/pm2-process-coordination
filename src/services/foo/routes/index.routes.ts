import express, { Router } from 'express';

import { isRunningOnPort } from '../controllers/test.controller';

const router: Router = express.Router();

router.route('/port/:number').get(isRunningOnPort);

export default router;
