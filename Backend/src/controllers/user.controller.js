import userClass from "../utils/userClass.js"

export const createUser = async (req, res) => {
    try {
        const user = await userClass.createNewUser(req.body);
        if (!user) return res.status(400).send('Mail de usuario ya existente');
        return res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const findUserByCategory = async (req, res) => {
    try {
        const foundUser = await userClass.findByCategory(req.body);
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
        return deletedUser ? res.status(200).send("Usuario eliminado"):res.status(400).send("No se ha podido encontrar el usuario");
    } catch (err) {
        console.log(err.message);
    }
}
