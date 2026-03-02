import express from 'express';
import { handleUniversalForm } from '../controllers/integrationController.js';

const router = express.Router();

router.post('/send-to-make', handleUniversalForm);

export default router;