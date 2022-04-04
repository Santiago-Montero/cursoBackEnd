const { createTransport } = require('nodemailer')

const TEST_MAIL = 'margaret.hane91@ethereal.email'

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'czp3rjf6dgwPPr3SyK'
    }
});


const mailOptions = {
    from: 'Servidor Node.js',
    to: 'santimonter200123@gmail.com',
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
}

transporter.sendMail(mailOptions)
.then((res) => console.log(res))
.catch((err) => console.log(err))


