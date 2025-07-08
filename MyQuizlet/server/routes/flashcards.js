import express from 'express';
import { createFlashcard } from '../controllers/FlashcardsController.js';

const router = express.Router();
router.post('/', createFlashcard);

export default router;