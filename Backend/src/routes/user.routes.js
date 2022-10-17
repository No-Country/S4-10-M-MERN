import express from 'express'
import { registerUser, findUserById, updateUserByCategory, deleteExistingUser, loginUser } from '../controllers/user.controller.js'
import { roleHandler } from '../middlewares/roleHandler.js';
import authenticateUser from '../middlewares/UserAthenticator.js';
const userRouter = express.Router()

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/getUserInfo', authenticateUser, findUserById);

userRouter.patch('/updateUserInfo', authenticateUser, updateUserByCategory);

userRouter.delete('/deleteUser', authenticateUser, roleHandler, deleteExistingUser);


export default userRouter