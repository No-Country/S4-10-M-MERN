require("dotenv").config({ path: "../../.env" });

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER || null, // generated ethereal user
        pass: process.env.NODEMAILER_PW || null // generated ethereal password
    },
});




export default transporter;