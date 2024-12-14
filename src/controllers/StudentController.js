import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

const activated = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await prisma.student.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'not found' });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: 'Success'});
  } catch {
    res.status(500).json({ message: "error serveur"});
  }
};

const students = async (_req, res, next) => {
  try {
    const students = await prisma.student.findMany();
    res.status(StatusCodes.OK).json({ students });
  } catch (error) {
    console.log(error);
  }
  next();
};

const getStudentByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(StatusCodes.OK).json({ student });
  } catch (error) {
    console.log(error);
  }
  next();
};

const store = async (req, res, next) => {
  try {
    const { full_name, phone_number, email, address, tutor } =
      req.body;
    await prisma.student.create({
      data: {
        full_name,
        phone_number,
        email,
        address,
        tutor
      },
    });
    await prisma.$disconnect();
    res
      .status(StatusCodes.OK)
      .json({ message: req.t("controller.student.add") });
  } catch (error) {
    console.log(error);
  }
  next();
};

const update = async (req, res, next) => {
  try {
    const { full_name, phone_number, email, address, tutor } =
    req.body;
    const id = req.params.id;
    await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        full_name,
        phone_number,
        email,
        address,
        tutor
      },
    });
    res
      .status(StatusCodes.OK)
      .json({ message: req.t("controller.student.edit") });
  } catch (error) {
    console.log(error);
  }
  next();
};

const destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    await prisma.student.delete({
      where: { id: parseInt(id) },
    });
    res
      .status(StatusCodes.OK)
      .json({ message: req.t("controller.student.drop") });
  } catch (error) {
    if (error.code == "P2003") {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: req.t("controller.student.del") });
    }
  }
  next();
};

export { activated, store, update, students, getStudentByID, destroy };
