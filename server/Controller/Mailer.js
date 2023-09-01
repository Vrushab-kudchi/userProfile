import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});

var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
    }
});

// POST : http://localhost:3001/api/registerMail
// @params{
// username: 'admin123',
// userEmail: 'admin123@gmail.com',
// text: "hahah",
// subject: "working"
// }
export const registerMail = (req, res) => {
    const { username, userEmail, text, subject } = req.body;
    var email = {
        body: {
            name: username,
            intro: text || 'Welcome to SecrueCrypt',
            outro: 'Thanks for Registration'
        }
    };

    var emailBody = mailGenerator.generate(email);

    let message = {
        from: process.env.MAILER_USERNAME,
        to: userEmail,
        subject: subject || 'Signup Successful',
        html: emailBody
    };

    transporter.sendMail(message)
        .then(() => res.status(200).send({ msg: "You should receive an email from us" }))
        .catch(error => res.status(500).send({ error }));
};
