import express from "express";
import {
  store,
  update,
  users,
  getUserByID,
  destroy,
  activated,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/users", users);
router.put("/users/status/:id", activated);
router.get("/users/:id", getUserByID);
router.post("/users", store);
router.put("/users/:id", update);
router.delete("/users/:id", destroy);

export default router;
