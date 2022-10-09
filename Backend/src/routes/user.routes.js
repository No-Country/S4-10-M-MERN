import express from 'express'
import { createUser, findUserByCategory, updateUserByCategory, deleteExistingUser } from '../controllers/user.controller.js'
const userRouter = express.Router()

userRouter.post('/', createUser);

userRouter.get('/getUserInfo', findUserByCategory);

userRouter.put('/updateUserInfo', updateUserByCategory);

userRouter.delete('/deleteUser', deleteExistingUser);


export default userRouter