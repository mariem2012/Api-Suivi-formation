import express from "express";
import {
  store,
  update,
  payments,
  getPaymentByID,
  destroy,
} from "../controllers/PaymentController.js";

const router = express.Router();

router.get("/payments", payments);
router.get("/payments/:id", getPaymentByID);
router.post("/payments", store);
router.put("/payments/:id", update);
router.delete("/payments/:id", destroy);

export default router;
