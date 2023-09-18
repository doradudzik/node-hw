const nodemailer = require("nodemailer");

const sendEmail = (userEmail, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.FROM_MAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: process.env.FROM_MAIL,
    to: userEmail,
    subject: "Email verification",
    text: "Please verify your email",
    html: `<div>
    <h1>Potwierdź swój adres email</h1>
    <p>Dziękujemy za rejestrację na naszej platformie. Aby dokończyć proces rejestracji, prosimy o potwierdzenie swojego adresu email.</p>
    <p>Kliknij poniższy link, aby zweryfikować swój adres email:</p>
    <p><a href='http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}'>Potwierdź swój adres email</a></p>
    <p>Jeśli nie rejestrowałeś się na naszej platformie, zignoruj tę wiadomość.</p>
    <p>Dziękujemy!</p>
    </div>`,
  };
  transporter.sendMail(mailOptions, (error, _) => {
    if (error) {
      console.error(`Error while sending email: ${error.message}`);
    } else {
      console.log(`Verification email sent`);
    }
  });
};

module.exports = sendEmail;
