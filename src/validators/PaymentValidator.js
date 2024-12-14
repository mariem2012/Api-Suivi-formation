import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

const addValidPayment = [
  check("payment_date")
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
    .matches("^[0-9]{2,}(?:.[0-9]){0,2}$")
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
      const id = req.body.registrationId;
      const result = await prisma.registration.findFirst({
        where: { id: parseInt(id) },
      });
      if (result.paid == 0) {
        throw new Error(
          "Cette inscription a été payée"
        );
      }
      if (value > result.paid) {
        throw new Error(
          "Le montant à payer ne doit pas être supérieur au montant d'inscription"
        );
      }
      return true;
    }),
  check("payer")
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
  check("payer_number")
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
    .bail(),
  check("payment_mode")
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
    .isLength({ max: 30 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 30";
    })
    .bail()
    .matches("^[0-9a-zA-Z -'çéèùà]*$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail(),
  check("registrationId")
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

const updateValidPayment = [
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
      const result = await prisma.payment.findFirst({
        where: { id: parseInt(value) },
      });
      if (!result) {
        throw new Error(req.t("validator.p_notExists"));
      }
      return true;
    }),
  check("payment_date")
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
    .matches("^[0-9]{2,}(?:.[0-9]){0,2}$")
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
      const id = req.body.registrationId;
      const result = await prisma.registration.findFirst({
        where: { id: parseInt(id) },
      });
      if (value > result.paid) {
        throw new Error(
          "Le montant à payer ne doit pas être supérieur au montant d'inscription"
        );
      }
      return true;
    }),
  check("payer")
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
  check("payer_number")
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
    .bail(),
  check("payment_mode")
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
    .isLength({ max: 30 })
    .withMessage((_value, { req }) => {
      return req.t("validator.maximum") + " 30";
    })
    .bail()
    .matches("^[0-9a-zA-Z -'çéèùà]*$")
    .withMessage((_value, { req }) => {
      return req.t("validator.match");
    })
    .bail(),
  check("registrationId")
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

const checkValidPaymentId = [
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
      const result = await prisma.payment.findFirst({
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

export { addValidPayment, updateValidPayment, checkValidPaymentId };
