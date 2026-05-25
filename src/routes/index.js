import { Router } from "express";
import { insertUrl, getLongUrl } from "../controllers/index.js";

const router = Router();

router.post('/create-link', insertUrl);

router.get('/get-long-link', getLongUrl)

export default router;