const { createTransport } = require('nodemailer')

const TEST_MAIL = 'santimonter200123@gmail.com'
//mjybrqzqnthplpuh
const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: TEST_MAIL,
        pass: 'mjybrqzqnthplpuh'
    }
});


const mailOptions = {
    from: TEST_MAIL,
    to: 'monterosantiago2001@gmail.com',
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
}

transporter.sendMail(mailOptions)
.then((res) => console.log(res))
.catch((err) => console.log(err))


