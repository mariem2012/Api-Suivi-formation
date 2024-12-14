import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

const addValidRegistre = [
  check("registration_date")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isISO8601()
    .withMessage((_value, { req }) => {
      return req.t("validator.date");
    })
    .bail()
    .isLength({ max: 30 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 30";
    })
    .bail(),
  check("start_date")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isISO8601()
    .withMessage((_value, { req }) => {
      return req.t("validator.date");
    })
    .bail()
    .isLength({ max: 30 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 30";
    })
    .bail(),
  check("amount")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .not()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.decimal");
    })
    .bail()
    .isDecimal()
    .withMessage((_value, { req }) => {
      return req.t("validator.decimal");
    })
    .bail()
    .matches("^[0-9]{2,}(?:[.][0-9]{0,2})*$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail()
    .isLength({ max: 20 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 20";
    })
    .bail()
    .custom(async (value, { req }) => {
      const id = req.body.moduleId;
      const result = await prisma.module.findFirst({
        where: { id: parseInt(id) },
      });
      if (value > result.price) {
        throw new Error(
          "Le montant d'inscription ne doit pas être supérieur au prix du module"
        );
      }
      return true;
    }),
  check("studentId")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .not()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .isInt()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .isLength({ max: 30 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 30";
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
  check("moduleId")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .not()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .isInt()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .isLength({ max: 30 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 30";
    })
    .bail()
    .custom(async (value, { req }) => {
      const result = await prisma.module.findFirst({
        where: { id: parseInt(value) },
      });
      if (!result) {
        throw new Error(req.t("validator.m_notExists"));
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

const updateValidRegistre = [
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
      const result = await prisma.registration.findFirst({
        where: { id: parseInt(value) },
      });
      if (!result) {
        throw new Error(req.t("validator.r_notExists"));
      }
      return true;
    }),
  check("registration_date")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isISO8601()
    .withMessage((_value, { req }) => {
      return req.t("validator.date");
    })
    .bail()
    .isLength({ max: 30 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 30";
    })
    .bail(),
  check("start_date")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .isISO8601()
    .withMessage((_value, { req }) => {
      return req.t("validator.date");
    })
    .bail()
    .isLength({ max: 30 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 30";
    })
    .bail(),
  check("amount")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .not()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.decimal");
    })
    .bail()
    .isDecimal()
    .withMessage((_value, { req }) => {
      return req.t("validator.decimal");
    })
    .bail()
    .matches("^[0-9]{2,}(?:[.][0-9]{0,2})*$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail()
    .isLength({ max: 20 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 20";
    })
    .bail()
    .custom(async (value, { req }) => {
      const id = req.body.moduleId;
      const result = await prisma.module.findFirst({
        where: { id: parseInt(id) },
      });
      if (value > result.price) {
        throw new Error(
          "Le montant d'inscription ne doit pas être supérieur au prix du module"
        );
      }
      return true;
    }),
  check("studentId")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .not()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .isInt()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .isLength({ max: 30 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 30";
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
  check("moduleId")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .not()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .isInt()
    .withMessage((_value, { req }) => {
      return req.t("validator.integer");
    })
    .bail()
    .isLength({ max: 30 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 30";
    })
    .bail()
    .custom(async (value, { req }) => {
      const result = await prisma.module.findFirst({
        where: { id: parseInt(value) },
      });
      if (!result) {
        throw new Error(req.t("validator.m_notExists"));
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

const checkValidRegistreId = [
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
      const result = await prisma.registration.findFirst({
        where: { id: parseInt(value) },
      });
      if (!result) {
        throw new Error(req.t("validator.r_notExists"));
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

export { addValidRegistre, updateValidRegistre, checkValidRegistreId };
