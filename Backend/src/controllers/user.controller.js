//models
import userClass from "../utils/userClass";
//books
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
//utils
const { AppError } = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");


//endpoints

export const createUser = catchAsync(async (req, res, next) => {
  const user = await userClass.createNewUser(req.body);

  if (!user) return next(new AppError(400, "Mail de usuario ya existente"));

  res.status(201).json({
    status: "success",
    data: { user },
  });
});

export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await userClass.findOne({
    //modelo user
    where: { email, status: "active" },
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(
      new AppError("400", "Credential are incorrect, please verify it.")
    );
  }

  //Add JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });

  user = await userClass.findOne({
    where: { email, status: "active" },
    attributes: { exclude: ["password", "createdAt", "updatedAt", "email"] },

    //attributes: { include: ['name', 'lastName', 'status'] }
  });

  res.status(200).json({
    status: "Success",
    data: { token, userData: user },
  });

  // const user = await User.findOne({ email: req.body.email });
  //   if (!user) return next(new AppError(400, "usuario no encontrado"));

  // const validPassword = await bcrypt.compare(req.body.password, user.password);
  // if (!validPassword) return next(new AppError(400, "password  incorrecto"));

  // // if(!user || validPassword) return next(new AppError(400, "Mail de usuario ya existente")

  // res.status(201).json({
  //     status: 'success',
  //     data: 'bienvenido'
  // })
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.findAll({
    attributes: { exclude: ["password"] },
  });

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({ status: "deleted" });

  res.status(204).json({ status: "success" });
});
