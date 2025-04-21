import { Router } from "express";
import {shortUrl} from "../controllers/urlController";

const router = Router()

router.post("/url", shortUrl);


export default router
