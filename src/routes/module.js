import express from "express";
import {
  store,
  update,
  modules,
  getModuleByID,
  destroy,
} from "../controllers/ModuleController.js";

import { addValidModule, updateValidModule, checkValidModuleId } from '../validators/ModuleValidator.js'

const router = express.Router();

router.get("/modules", modules);
router.get("/modules/:id", checkValidModuleId, getModuleByID);
router.post("/modules", addValidModule, store);
router.put("/modules/:id", updateValidModule, update);
router.delete("/modules/:id", checkValidModuleId, destroy);

export default router;
