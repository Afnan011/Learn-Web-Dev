const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAIL_TOKEN;
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sendConfirmationEmail = (recipientEmail, teamName) => {
    
  const sender = {
    email: "noreply@aantarya.tech",
    name: "Registration Confirmation",
  };

  const recipients = [
    {
      email: recipientEmail,
    }
  ];

  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "7b773a03-6a64-45ae-9912-25c31400c3bf",
      template_variables: {
        team_name: teamName
    }
    })
    .then(console.log, console.error);
};


module.exports = { sendConfirmationEmail };