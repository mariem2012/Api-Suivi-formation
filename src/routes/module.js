import express from "express";
import {
  store,
  update,
  modules,
  getModuleByID,
  destroy,
} from "../controllers/ModuleController.js";

const router = express.Router();

router.get("/modules", modules);
router.get("/modules/:id", getModuleByID);
router.post("/modules", store);
router.put("/modules/:id", update);
router.delete("/modules/:id", destroy);

export default router;
