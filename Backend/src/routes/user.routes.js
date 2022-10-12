import express from 'express'
import { registerUser, findUserById, updateUserByCategory, deleteExistingUser, loginUser } from '../controllers/user.controller.js'
const userRouter = express.Router()

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/getUserInfo', findUserById);

userRouter.put('/updateUserInfo', updateUserByCategory);

userRouter.delete('/deleteUser', deleteExistingUser);


export default userRouter