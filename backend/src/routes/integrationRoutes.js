import express from 'express';
const router = express.Router();
// Імпортуємо твій контролер (перевір правильність шляху до файлу)

import { handleUniversalForm, testMakeWebhook } from '../controllers/integrationController.js';

// Створюємо шлях
router.post('/send-to-make', handleUniversalForm);
router.post('/settings/test-webhook', testMakeWebhook);

export default router;