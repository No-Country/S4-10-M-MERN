//models
import userClass from "../utils/userClass";
import globalClass from "../utils/globalClass";
//books
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
//utils
const { AppError } = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");
const { filterObject } = require("../utils/");

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

  const userExist = await this.model.findOne({ email });
  if (!userExist) return new AppError(400, "invalid email");

  // const validPassword = await bcrypt.compare(req.body.password, user.password);
  // if (!validPassword) return next(new AppError(400, "password  incorrecto"));

  const token = await userClass.loginUser(email, password);
  if (!token) return new AppError(400, "datos incorrectos");

  res.status(201).json({
    status: "success",
    data: { token },
  });
});

export const UpdateById = catchAsync(async (req, res, next) => {
  // const { cat, update, id } = req.body;
  // const updateUser = await userClass.UpdateById(req.body )
  const updateUser = filterObject(req.body, "cat", "update", "id");
  await UpdateById.update({ ...updateUser });

  // const updateUser = await userClass.UpdateById(cat, update, id )

  // if(!updateUser) return next(new AppError(400, 'datos no actualizados'));

  res.status(200).json({
    status: "success",
    data: {
      updateUser,
    },
  });
});

export const findById = catchAsync(async (req, res, next) => {
  const userId = await globalClass.findById(req.body);

  if (!userId) return next(new AppError(400, "id no encontrado"));
  res.status(201).json({
    status: "success",
    data: {
      userId,
    },
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const user = await globalClass.findAll(req.body);

  if (!user) return next(new AppError(400, "usuarios no encontrados"));

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const deleteUser = await globalClass.deleteUserByUsername(req.body);
  if (!deleteUser) return next(new AppError(400, "usuario no eliminado"));

  res.status(201).json({
    status: "success",
    message: `The user with id was deleted correctly`,
  });
});
