import userClass from "../utils/userClass.js";


const roleHandler = async (req, res, next) => {
    const id = req.locals;
    const foundUser = await userClass.findById(id);
    return foundUser.role == "admin" ? next() : res.status(403).send({ message: "El usuario no tiene los permisos necesarios" });
}

export default roleHandler;