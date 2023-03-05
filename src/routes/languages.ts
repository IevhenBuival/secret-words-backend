import express from 'express';
import * as LangController from '../controlers/languages';
import { requiresRights } from '../middleware/rights';


const router = express.Router();
router.get('/',LangController.getLanguages);

router.get('/view/',requiresRights,LangController.getLanguages);
router.get("/:langID",requiresRights,LangController.getLanguage);

router.post('/',requiresRights,LangController.createLanguage);

router.patch("/:langID",requiresRights,LangController.updateLanguage);

export default router;