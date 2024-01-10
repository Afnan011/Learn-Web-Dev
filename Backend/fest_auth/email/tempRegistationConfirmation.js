const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAIL_TOKEN;
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sendConfirmationEmail = (recipientEmail, collegeName, isUG) => {
    
  const sender = {
    email: "noreply@aantarya.tech",
    name: "Registration Confirmation - Aantarya 2k24",
  };

  isUG = isUG ? "UG" : "PG";

  const recipients = [
    {
      email: recipientEmail,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "8113b124-9ada-467c-9e41-8bc9707542dc",
      template_variables: {
        college_name: collegeName,
        ug_pg: isUG
    }
    })
    .then(console.log, console.error);
};


module.exports = { sendConfirmationEmail };