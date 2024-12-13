import express from "express";
import {
  store,
  update,
  registrations,
  getRegistrationByID,
  destroy,
} from "../controllers/RegistrationController.js";

const router = express.Router();

router.get("/registrations", registrations);
router.get("/registrations/:id", getRegistrationByID);
router.post("/registrations", store);
router.put("/registrations/:id", update);
router.delete("/registrations/:id", destroy);

export default router;
