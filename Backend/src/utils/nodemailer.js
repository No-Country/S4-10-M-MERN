import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER || null, // generated ethereal user
        pass: process.env.NODEMAILER_PW || null // generated ethereal password
    },
});

const mailOpts = (sendTo, link, env = null) => {
    let to = sendTo;
    let subject = "";
    let html = "";
    if (env == "ver") {
        subject = "Email de verificación de la cuenta"
        html = `<h3>Por favor haz click acá para verificar tu cuenta <a href="${link}">Clickea acá</a></h3>`
    } else {
        subject = "Olvido de contraseña"
        html = `<h3>Por favor haz click acá para recibir el link de olvido de contraseña <a href="${link}">Clickea acá</a></h3>`
    }
    return ({
        from: 'interfaz de juegos',
        to,
        subject,
        html
    })
}

export { transporter, mailOpts };