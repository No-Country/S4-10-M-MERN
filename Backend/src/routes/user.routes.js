import express from 'express'
import { createUser, findUserById, updateUserByCategory, deleteExistingUser } from '../controllers/user.controller.js'
const userRouter = express.Router()

userRouter.post('/', createUser);

userRouter.get('/getUserInfo', findUserById);

userRouter.put('/updateUserInfo', updateUserByCategory);

userRouter.delete('/deleteUser', deleteExistingUser);


export default userRouter