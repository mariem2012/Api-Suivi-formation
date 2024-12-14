import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

const modules = async (_req, res, next) => {
  try {
    const modules = await prisma.module.findMany({});
    res.status(StatusCodes.OK).json({ modules });
  } catch (error) {
    console.log(error);
  }
  next();
};

const getModuleByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const module = await prisma.module.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(StatusCodes.OK).json({ module });
  } catch (error) {
    console.log(error);
  }
  next();
};

const store = async (req, res, next) => {
  try {
    const { name, duration, price } = req.body;
    await prisma.module.create({
      data: {
        name,
        duration: parseInt(duration),
        price: parseFloat(price),
      },
    });
    await prisma.$disconnect();
    res
      .status(StatusCodes.OK)
      .json({ message: req.t("controller.module.add") });
  } catch (error) {
    console.log(error);
  }
  next();
};

const update = async (req, res, next) => {
  try {
    const { name, duration, price } = req.body;
    const id = req.params.id;
    await prisma.module.update({
      where: { id: parseInt(id) },
      data: {
        name,
        duration: parseInt(duration),
        price: parseFloat(price),
      },
    });
    res
      .status(StatusCodes.OK)
      .json({ message: req.t("controller.module.edit") });
  } catch (error) {
    console.log(error);
  }
  next();
};

const destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    await prisma.module.delete({
      where: { id: parseInt(id) },
    });
    res
      .status(StatusCodes.OK)
      .json({ message: req.t("controller.module.drop") });
  } catch (error) {
    if (error.code == "P2003") {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: req.t("controller.module.del") });
    }
  }
  next();
};

export { modules, getModuleByID, store, update, destroy };
