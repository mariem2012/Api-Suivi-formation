import express from "express";
import {
  store,
  update,
  students,
  getStudentByID,
  destroy,
  activated,
} from "../controllers/StudentController.js";

import {
  addValidStudent,
  updateValidStudent,
  checkValidStudentId,
} from "../validators/StudentValidator.js";

const router = express.Router();

router.get("/students", students);
router.put("/students/status/:id", activated);
router.get("/students/:id", checkValidStudentId, getStudentByID);
router.post("/students", addValidStudent, store);
router.put("/students/:id", updateValidStudent, update);
router.delete("/students/:id", checkValidStudentId, destroy);

export default router;
