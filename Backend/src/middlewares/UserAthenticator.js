import jwt from 'jsonwebtoken';

export default async function authenticateUser(req, res, next) {
    try {
        let bearerHeader = req.headers['authorization'];
        let token = bearerHeader.split(' ')[1];
        const verify = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
        req.locals.userId = verify.id;
        next();
    } catch (error) {
        res.status(401).send('El usuario no está autentificado');
    }
}