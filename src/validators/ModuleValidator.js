import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

const addValidModule = [
  check("name")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .matches("^[A-Z][a-zA-Z éèàù0-9-]*$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.string");
    })
    .bail()
    .isLength({ max: 50 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 50";
    })
    .bail()
    .custom(async (value, { req }) => {
      const result = await prisma.module.findFirst({
        where: { name: value },
      });
      if (result) {
        throw new Error(req.t("validator.m_exists"));
      }
      return true;
    }),
  check("duration")
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
    .matches("^[0-9]*$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail()
    .isLength({ max: 10 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 10";
    })
    .bail(),
  check("price")
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

const updateValidModule = [
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
      const result = await prisma.module.findFirst({
        where: { id: parseInt(value) },
      });
      if (!result) {
        throw new Error(req.t("validator.m_notExists"));
      }
      return true;
    }),
  check("name")
    .notEmpty()
    .withMessage((_value, { req }) => {
      return req.t("validator.empty");
    })
    .bail()
    .matches("^[A-Z][a-zA-Z éèàù0-9-]*$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail()
    .isString()
    .withMessage((_value, { req }) => {
      return req.t("validator.string");
    })
    .bail()
    .isLength({ max: 50 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 50";
    })
    .bail()
    .custom(async (value, { req }) => {
      const id = req.params.id;
      const result = await prisma.module.findFirst({
        where: { name: value },
      });
      if (result && result.id !== parseInt(id)) {
        throw new Error(req.t("validator.m_exists"));
      }
      return true;
    }),
  check("duration")
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
    .matches("^[0-9]*$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail()
    .isLength({ max: 10 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 10";
    })
    .bail(),
  check("price")
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

const checkValidModuleId = [
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

export { addValidModule, updateValidModule, checkValidModuleId };
