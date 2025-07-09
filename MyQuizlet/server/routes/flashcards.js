import express from 'express';
import { createFlashcard, getFlashcardsBySet } from '../controllers/FlashcardsController.js';

const router = express.Router();
router.post('/', createFlashcard);
router.get('/set/:set_id', getFlashcardsBySet);

export default router;