import prisma from '../config/prisma.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
// import { UserSerialiser } from '../serialisers/UserSerialiser.js';

const activated = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: req.t('controller.status.not_found') });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: req.t('controller.status.success') });
  } catch {
    res.status(500).json({ message: req.t('controller.status.error') });
  }
};

const users = async (_req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    // const users = UserSerialiser.serializerForTable(result);
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    console.log(error);
  }
  next();
};

const getUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    // const user = UserSerialiser.serializerForUser(result);
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.log(error);
  }
  next();
};

const store = async (req, res, next) => {
  try {
    const { full_name, email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { full_name, email, password: hashPassword, role },
    });
    await prisma.$disconnect();
    res.status(StatusCodes.OK).json({ message: req.t('controller.user.add') });
  } catch (error) {
    console.log(error);
  }
  next();
};

const update = async (req, res, next) => {
  try {
    const { full_name, email, role } = req.body;
    const id = req.params.id;
    await prisma.user.update({
      where: { id: parseInt(id) },
      data: { full_name, email, role },
    });
    res.status(StatusCodes.OK).json({ message: req.t('controller.user.edit') });
  } catch (error) {
    console.log(error);
  }
  next();
};

// const edit = async (req, res, next) => {
//   try {
//     const { full_name, email } = req.body;
//     const id = req.params.id;
//     await prisma.user.update({
//       where: { id: parseInt(id) },
//       data: { full_name, email },
//     });
//     res
//       .status(StatusCodes.OK)
//       .json({ message: req.t('controller.user.editUser') });
//   } catch (error) {
//     console.log(error);
//   }
//   next();
// };

// const editPassword = async (req, res, next) => {
//   try {
//     const { new_password } = req.body;
//     const id = req.params.id;
//     const hashPassword = await bcrypt.hash(new_password, 10);
//     await prisma.user.update({
//       where: { id: parseInt(id) },
//       data: { password: hashPassword },
//     });
//     res.status(StatusCodes.OK).json({ message: req.t('controller.user.pwd') });
//   } catch (error) {
//     console.log(error);
//   }
//   next();
// };

const destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(StatusCodes.OK).json({ message: req.t('controller.user.drop') });
  } catch (error) {
    if (error.code == 'P2003') {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: req.t('controller.user.del') });
    }
  }
  next();
};

export {
  users,
  getUserByID,
  store,
  update,
  destroy,
  activated,
//   edit,
//   editPassword,
};
