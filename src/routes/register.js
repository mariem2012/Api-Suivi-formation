import express from "express";
import {
  store,
  update,
  registrations,
  getRegistrationByID,
  destroy,
  getModulePrice,
} from "../controllers/RegistrationController.js";

import { addValidRegistre, updateValidRegistre, checkValidRegistreId } from '../validators/RegistrationValidator.js'

const router = express.Router();

router.get("/registrations", registrations);
router.get("/registrations/:id", checkValidRegistreId, getRegistrationByID);
router.get("/registrations-amount/:id", getModulePrice);
router.post("/registrations", addValidRegistre, store);
router.put("/registrations/:id", updateValidRegistre, update);
router.delete("/registrations/:id", checkValidRegistreId, destroy);

export default router;
