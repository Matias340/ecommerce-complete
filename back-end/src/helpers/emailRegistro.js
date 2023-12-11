import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, username, token } = datos;

  //Enviar el email

  const info = await transport.sendMail({
    from: "Administrador de Ecommerce",
    to: email,
    subject: "Comprueba tu cuenta para el Ecommerce",
    text: "Comprueba tu cuenta para el Ecommerce",
    html: `<p>Hola: ${username}, comprueba tu cuenta para el Ecommerce.</p>
     <p>Tu cuenta ya esta lista, solo debes comprobarlo en el siguiente enlace</p><a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

     <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
     `,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailRegistro;
