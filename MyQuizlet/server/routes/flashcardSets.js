import express from 'express';
import { createFlashcardSets } from '../controllers/FlashcardSetsController.js';

const router = express.Router();
router.post('/', createFlashcardSets);

export default router;