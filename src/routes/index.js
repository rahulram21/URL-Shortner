import { Router } from "express";
import { insertUrl } from "../controllers/index.js";

const router = Router();

router.post('/create-link', insertUrl);

export default router;