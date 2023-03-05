import express from 'express';
import * as WordsController from '../controlers/words';


const router = express.Router();
router.get('/',WordsController.getWords);

router.get("/:wordID",WordsController.getWord);

router.post('/',WordsController.createWord);

router.patch("/:wordID",WordsController.updateWord);

router.delete("/:wordID",WordsController.deleteWord);

export default router;