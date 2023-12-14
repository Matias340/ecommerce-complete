import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
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
    subject: "Reestablece tu contraseña",
    text: "Reestablece tu contraseña",
    html: `<p>Hola: ${username}, Reestable tu contraseña.</p>
     <p>Genera tu nueva contraseña con este enlace</p><a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reestablece Contraseña</a>

     <p>Si tu no pediste reestablecer tu contraseña, puedes ignorar este mensaje</p>
     `,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;
