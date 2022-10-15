import userClass from "../utils/userClass.js"
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const user = await userClass.createNewUser(req.body);
        if (!user) return res.status(400).send('Mail de usuario ya existente');
        return res.status(200).send("usuario ha sido creado");
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await userClass.findByEmail(email);

        if (!userExists) return res.status(500).send("El usuario o contraseña son incorrectos");

        const passwordMatch = await userModel.comparePassword(password, userExists.password);

        console.log(passwordMatch);

        if (!passwordMatch) return res.status(500).send("El usuario o contraseña son incorrectos");

        const authToken = jwt.sign(
            { id: userExists._id },
            process.env.SECRET_ACCESS_KEY,
            { expiresIn: '5m' }
        )
        return res.status(200).send({
            message: "usuario logeado",
            authToken: loginToken
        });

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const findUserById = async (req, res) => {
    try {
        const foundUser = await userClass.findById(req.query);
        return foundUser ? res.status(200).send(foundUser) : res.status(400).send("Usuario no encontrado");
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export const updateUserByCategory = async (req, res) => {
    try {
        const updatedUser = await userClass.updateUserInfo(req.body);
        return updatedUser ? res.status(200).send("La información del usuario ha sido actualizada") : res.status(400).send("Ha ocurrido un error por favor intente nuevamente");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const deleteExistingUser = async (req, res) => {
    try {
        const deletedUser = await userClass.deleteUser(req.body);
        return deletedUser ? res.status(200).send("Usuario eliminado") : res.status(400).send("No se ha podido encontrar el usuario");
    } catch (err) {
        console.log(err.message);
    }
}
