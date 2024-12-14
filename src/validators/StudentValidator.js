import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

const addValidStudent = [
  check("full_name")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.string");
    })
    .bail()
    .isLength({ min: 3 })
    .withMessage((_value, { req }) => {
      return req.t("validator.minimum") + " 3";
    })
    .bail()
    .isLength({ max: 50 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 50";
    })
    .bail()
    .matches("^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail(),
  check("phone_number")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .isLength({ min: 8 })
    .withMessage((_value, { req }) => {
      return req.t("validator.tel");
    })
    .bail()
    .isLength({ max: 20 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 20";
    })
    .bail()
    .matches("^[+]*[0-9]+$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail()
    .custom(async (value, { req }) => {
      const result = await prisma.student.findFirst({
        where: { phone_number: value },
      });
      if (result) {
        throw new Error(req.t("validator.phone"));
      }
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isEmail()
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail()
    .isLength({ max: 100 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 100";
    })
    .bail()
    .custom(async (value, { req }) => {
      const result = await prisma.student.findFirst({
        where: { email: value },
      });
      if (result) {
        throw new Error(req.t("validator.email"));
      }
      return true;
    }),
  check("address")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.string");
    })
    .bail()
    .isLength({ min: 5 })
    .withMessage((_value, { req }) => {
      return req.t("validator.minimum") + " 5";
    })
    .bail()
    .isLength({ max: 100 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 100";
    })
    .bail()
    .matches("^[0-9a-zA-Z -'çéèùà,]*$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const updateValidStudent = [
  param("id")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isLength({ max: 10 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 10";
    })
    .bail()
    .isInt()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .custom(async (value, { req }) => {
      const result = await prisma.student.findFirst({
        where: { id: parseInt(value) },
      });
      if (!result) {
        throw new Error(req.t("validator.st_notExists"));
      }
      return true;
    }),
  check("full_name")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.string");
    })
    .bail()
    .isLength({ min: 3 })
    .withMessage((_value, { req }) => {
      return req.t("validator.minimum") + " 3";
    })
    .bail()
    .isLength({ max: 50 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 50";
    })
    .bail()
    .matches("^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail(),
  check("phone_number")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .isLength({ min: 8 })
    .withMessage((_value, { req }) => {
      return req.t("validator.tel");
    })
    .bail()
    .isLength({ max: 20 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 20";
    })
    .bail()
    .matches("^[+]*[0-9]+$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail()
    .custom(async (value, { req }) => {
      const id = req.params.id;
      const result = await prisma.student.findFirst({
        where: { phone_number: value },
      });
      if (result && result.id !== parseInt(id)) {
        throw new Error(req.t("validator.phone"));
      }
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isEmail()
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail()
    .isLength({ max: 100 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 100";
    })
    .bail()
    .custom(async (value, { req }) => {
      const id = req.params.id;
      const result = await prisma.student.findFirst({
        where: { email: value },
      });
      if (result && result.id !== parseInt(id)) {
        throw new Error(req.t("validator.email"));
      }
      return true;
    }),
  check("address")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.string");
    })
    .bail()
    .isLength({ min: 5 })
    .withMessage((_value, { req }) => {
      return req.t("validator.minimum") + " 5";
    })
    .bail()
    .isLength({ max: 100 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 100";
    })
    .bail()
    .matches("^[0-9a-zA-Z -'çéèùà,]*$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const checkValidStudentId = [
  param("id")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isLength({ max: 10 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 10";
    })
    .bail()
    .isInt()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .custom(async (value, { req }) => {
      const result = await prisma.student.findFirst({
        where: { id: parseInt(value) },
      });
      if (!result) {
        throw new Error(req.t("validator.st_notExists"));
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

export { addValidStudent, updateValidStudent, checkValidStudentId };
