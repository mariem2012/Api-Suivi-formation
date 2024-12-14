import express from "express";
import {
  store,
  update,
  registrations,
  getRegistrationByID,
  destroy,
  getAmountByModule,
} from "../controllers/RegistrationController.js";

import { addValidRegistre, updateValidRegistre, checkValidRegistreId } from '../validators/RegistrationValidator.js'

const router = express.Router();

router.get("/registrations", registrations);
router.get("/registrations/:id", checkValidRegistreId, getRegistrationByID);
router.get("/registrations-amount", getAmountByModule);
router.post("/registrations", addValidRegistre, store);
router.put("/registrations/:id", updateValidRegistre, update);
router.delete("/registrations/:id", checkValidRegistreId, destroy);

export default router;
