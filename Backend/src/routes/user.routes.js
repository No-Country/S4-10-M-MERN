import express from 'express'
import { registerUser, findUserById, updateUserByCategory, deleteExistingUser, loginUser } from '../controllers/user.controller.js'
import authenticateUser from '../middlewares/UserAthenticator.js';
const userRouter = express.Router()

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/getUserInfo', authenticateUser, findUserById);

userRouter.put('/updateUserInfo', updateUserByCategory);

userRouter.delete('/deleteUser', deleteExistingUser);


export default userRouter