import express from "express";

//controllers
import {
  createUser,
  loginUser,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller";

//express router
const router = express.Router();


//routes
router.post("/", createUser);
router.get("/all", getAllUsers);
router.post("/login", loginUser);
router.delete("/delete", deleteUser);

//exports
module.exports = { userRouter: router };
