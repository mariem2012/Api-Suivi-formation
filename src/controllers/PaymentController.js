import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";
import { PaymentSerialiser } from "../serialisers/PaymentSerialiser.js";
import { RegistrationSerialiser } from "../serialisers/RegistrationSerialiser.js";

const payments = async (_req, res, next) => {
  try {
    const result = await prisma.payment.findMany({
      include: {
        registration: {
          include: {
            student: {
              select: {
                id: true,
                full_name: true,
              },
            },
            module: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const payments = PaymentSerialiser.serializerForTable(result);
    res.status(StatusCodes.OK).json({ payments });
  } catch (error) {
    console.log(error);
  }
  next();
};

const getPaymentByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.payment.findUnique({
      where: { id: parseInt(id) },
      include: {
        registration: {
          include: {
            student: {
              select: {
                id: true,
                full_name: true,
              },
            },
            module: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const payment = PaymentSerialiser.serializerForPayment(result);
    res.status(StatusCodes.OK).json({ payment });
  } catch (error) {
    console.log(error);
  }
  next();
};

const store = async (req, res, next) => {
  try {
    const {
      payment_date,
      amount,
      payer,
      payer_number,
      payment_mode,
      registrationId,
    } = req.body;
    
    await prisma.payment.create({
      data: {
        payment_date: new Date(payment_date).toISOString(),
        amount: parseFloat(amount),
        payer,
        payer_number,
        payment_mode,
        registrationId,
      },
    });

    await prisma.registration.update({
      where: { id: parseInt(registrationId) },
      data: { paid: { decrement: parseFloat(amount) } },
    });
    await prisma.$disconnect();
    res
      .status(StatusCodes.OK)
      .json({ message: req.t("controller.payment.add") });
  } catch (error) {
    console.log(error);
  }
  next();
};

const destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await prisma.payment.findUnique({where: {id: parseInt(id)}})

    await prisma.registration.update({
      where: { id: parseInt(result.registrationId) },
      data: { paid: { increment: parseFloat(result.amount) } },
    });

    await prisma.payment.delete({
      where: { id: parseInt(id) },
    });
    res
      .status(StatusCodes.OK)
      .json({ message: req.t("controller.payment.drop") });
  } catch (error) {
    if (error.code == "P2003") {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: req.t("controller.payment.del") });
    }
  }
  next();
};

const getStudentRegistrations = async (req, res, next) => {
  try {
    // const { studentId } = req.body;
    const id = req.params.id;
    const result = await prisma.registration.findMany({
      where: { studentId: parseInt(id)},
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
    })
    const registrations = RegistrationSerialiser.serializerForTable(result);
    res.status(StatusCodes.OK).json({ registrations });
  } catch (error) {
    console.log(error);
  }
  next()
}
const getAmountByRegistration = async (req, res, next) => {
  try {    
    // const { registrationId } = req.body;
    const id = req.params.id;
    const result = await prisma.registration.findUnique({
      where: { id: parseInt(id) }});
      

    const amount = result.paid
    res.status(StatusCodes.OK).json({ amount });
  } catch (error) {
    console.log(error);
  }
  next();
}

export { payments, getPaymentByID, store, destroy, getStudentRegistrations, getAmountByRegistration };
