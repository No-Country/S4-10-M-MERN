import express from 'express'
import { registerUser, findUserById, updateUserByCategory, deleteExistingUser, loginUser, updateScore, getUsersHighScore } from '../controllers/user.controller.js'
import roleHandler from '../middlewares/roleHandler.js';
import authenticateUser from '../middlewares/UserAthenticator.js';

const userRouter = express.Router();

userRouter.get('/getUserInfo', authenticateUser, findUserById);

userRouter.get('/score', authenticateUser, getUsersHighScore);

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.patch('/updateUserInfo', authenticateUser, updateUserByCategory);

userRouter.patch('/score', authenticateUser, updateScore);

userRouter.delete('/deleteUser', authenticateUser, roleHandler, deleteExistingUser);


export default userRouter