import express from 'express';
import { createFlashcardSets, getFlashcardSets } from '../controllers/FlashcardSetsController.js';

const router = express.Router();

router.get('/', getFlashcardSets);
router.post('/', createFlashcardSets);

export default router;