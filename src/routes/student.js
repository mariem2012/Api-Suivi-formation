import express from "express";
import {
  store,
  update,
  students,
  getStudentByID,
  destroy,
  activated,
} from "../controllers/StudentController.js";

const router = express.Router();

router.get("/students", students);
router.put("/students/status/:id", activated);
router.get("/students/:id", getStudentByID);
router.post("/students", store);
router.put("/students/:id", update);
router.delete("/students/:id", destroy);

export default router;
