import express from "express";

//controllers
import {
  createUser,
  loginUser,
  UpdateById,
  getAllUsers,
  findById,
  deleteUser,
} from "../controllers/user.controller";

//express router
const router = express.Router();

//routes

router.post("/", createUser);

router.post("/login", loginUser);

router.put("/id", UpdateById);

router.get("/all", getAllUsers);

router.get("/id", findById);

router.delete("/delete", deleteUser);

//exports
export default userRouter

