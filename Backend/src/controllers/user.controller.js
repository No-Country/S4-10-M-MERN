import userClass from "../utils/userClass.js"

export const createUser = async (req, res) => {
    try {

        const user = await userClass.createNewUser(req.body)
        if (!user) return res.status(400).send('Mail de usuario ya existente')
        return res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err.message)
    }
}