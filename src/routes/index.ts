import { Router } from "express";
const router = Router();

// Importing routes
import Deliveries from './deliveries';
import Bots from "./bots";

// Using routes
router.use("/deliveries", Deliveries);
router.use("/bots", Bots);

export default router;