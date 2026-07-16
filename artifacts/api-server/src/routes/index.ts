import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import authRouter from "./auth";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

router.use(authRouter);
router.use(healthRouter);
router.use(requireAuth, leadsRouter);

export default router;
