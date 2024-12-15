import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";
import { RegistrationSerialiser } from '../serialisers/RegistrationSerialiser.js';
import moment from "moment";

const registrations = async (_req, res, next) => {
  try {
    const result = await prisma.registration.findMany({
      include: {
        student: {
          select: {
            id: true,
            full_name: true,
            phone_number: true,
          },
        },
        module: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const registrations = RegistrationSerialiser.serializerForTable(result);
    res.status(StatusCodes.OK).json({ registrations });
  } catch (error) {
    console.log(error);
  }
  next();
};

const getRegistrationByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.registration.findUnique({
      where: { id: parseInt(id) },
      include: {
        student: {
          select: {
            id: true,
            full_name: true,
            phone_number: true,
          },
        },
        module: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const registration = RegistrationSerialiser.serializerForRegistre(result);
    res.status(StatusCodes.OK).json({ registration });
  } catch (error) {
    console.log(error);
  }
  next();
};


const getModulePrice = async (req, res, next) => {
  try {
    // const { moduleId } = req.body;
    const id = req.params.id;
    const result = await prisma.module.findUnique({
      where: { id: parseInt(id) }
    });
    const amount = result.price
    res.status(StatusCodes.OK).json({ amount });
  } catch (error) {
    console.log(error);
  }
  next();
};


const store = async (req, res, next) => {
  try {
    const {
      registration_date,
      start_date,
      amount,
      studentId,
      moduleId,
    } = req.body;

    const result = await prisma.module.findUnique({
      where: { id: moduleId }
    })
    const end_date = moment(start_date).add(result.duration, 'd')

    await prisma.registration.create({
      data: {
        registration_date: new Date(registration_date).toISOString(),
        start_date: new Date(start_date).toISOString(),
        end_date: new Date(end_date).toISOString(),
        amount: parseFloat(amount),
        paid: parseFloat(amount),
        studentId,
        moduleId,
      },
    });
    await prisma.$disconnect();
    res
      .status(StatusCodes.OK)
      .json({ message: req.t("controller.register.add") });
  } catch (error) {
    console.log(error);
  }
  next();
};

const update = async (req, res, next) => {
  try {
    const {
      registration_date,
      start_date,
      amount,
      studentId,
      moduleId,
    } = req.body;
    const id = req.params.id;

    const result = await prisma.module.findUnique({
      where: { id: moduleId }
    })
    const end_date = moment(start_date).add(result.duration, 'd')
    await prisma.registration.update({
      where: { id: parseInt(id) },
      data: {
        registration_date: new Date(registration_date).toISOString(),
        start_date: new Date(start_date).toISOString(),
        end_date: new Date(end_date).toISOString(),
        amount: parseFloat(amount),
        paid: parseFloat(amount),
        studentId,
        moduleId,
      },
    });
    res
      .status(StatusCodes.OK)
      .json({ message: req.t("controller.register.edit") });
  } catch (error) {
    console.log(error);
  }
  next();
};

const destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    await prisma.registration.delete({
      where: { id: parseInt(id) },
    });
    res
      .status(StatusCodes.OK)
      .json({ message: req.t("controller.register.drop") });
  } catch (error) {
    if (error.code == "P2003") {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: req.t("controller.register.del") });
    }
  }
  next();
};

export { registrations, getRegistrationByID, store, update, destroy, getModulePrice };
