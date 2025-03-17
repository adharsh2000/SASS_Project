import express from "express";
import { createTenant } from "../controller/onboarding.controller";

const router = express.Router();

router.route("/").post(createTenant);

export default router;