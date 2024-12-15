import express from "express";
import {
  store,
  // update,
  payments,
  getPaymentByID,
  destroy,
  getAmountByRegistration,
  getStudentRegistrations,
} from "../controllers/PaymentController.js";

import { addValidPayment, updateValidPayment, checkValidPaymentId } from '../validators/PaymentValidator.js'

const router = express.Router();

router.get("/payments", payments);
router.get("/payments/:id", checkValidPaymentId, getPaymentByID);
router.post("/payments", addValidPayment, store);
router.get("/payments-registrations/:id", getAmountByRegistration);
router.get("/payments-students/:id", getStudentRegistrations);
// router.put("/payments/:id", updateValidPayment,update);
router.delete("/payments/:id", checkValidPaymentId, destroy);

export default router;
