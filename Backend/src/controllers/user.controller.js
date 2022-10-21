import userClass from "../utils/userClass.js"
import { UserModel } from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const errorMsg = "Ha ocurrido un error por favor intente nuevamente";

export const registerUser = async (req, res) => {
    try {
        const user = await userClass.createNewUser(req.body);
        if (!user) return res.status(400).send('Mail de usuario ya existente');
        return res.status(200).json({ message: "usuario ha sido creado" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userClass.findByEmail(email);

        if (!user) return res.status(500).json({ message: "El usuario o contraseña son incorrectos" });

        const passwordMatch = await UserModel.comparePassword(password, user.password);

        if (!passwordMatch) return res.status(500).json({ message: "El usuario o contraseña son incorrectos" });

        const authToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_ACCESS_KEY,
            { expiresIn: '1h' }
        )

        return res.status(200).send({
            message: "usuario logueado",
            username: user.username,
            authToken
        });

    } catch (err) {
        res.status(500).json({ message: errorMsg });
    }
}

export const findUserById = async (req, res) => {
    try {
        const foundUser = await userClass.findById(req.locals);
        return foundUser ?
            res.status(200).send({
                username: foundUser.username,
                fullName: foundUser.fullName,
                email: foundUser.email
            }) :
            res.status(400).send("Usuario no encontrado");
    } catch (err) {
        res.status(500).json({ message: errorMsg });
    }

}

export const updateUserByCategory = async (req, res) => {
    try {

        const updatedUser = await userClass.updateUserInfo(req.body);

        return updatedUser ? res.status(200).send("La información del usuario ha sido actualizada") : res.status(400).send("Ha ocurrido un error por favor intente nuevamente");

    } catch (err) {
        res.status(500).json({ message: errorMsg });
    }
}

export const updateScore = async (req, res) => {
    try {
        const { game, score } = req.query;

        if (score < 0 || score > 100000) return res.status(400).send({ message: "Hay un problema con el score" })

        const id = req.locals;

        const userHighScore = await userClass.updateUserScore(id, score, game);

        return res.status(200).send({ userHighScore });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getUsersHighScore = async (req, res) => {
    try {
        const { game } = req.query;

        const usersHighScore = await userClass.getHighScore(game);

        return res.status(200).send(usersHighScore)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteExistingUser = async (req, res) => {
    try {

        const deletedUser = await userClass.deleteUser(req.locals);

        return deletedUser ? res.status(200).send("Usuario eliminado") : res.status(400).json({ message: "No se ha podido encontrar el usuario" });
    } catch (err) {
        res.status(500).json({ message: errorMsg });
    }
}
