/**
 * Mock Email Service
 * In a production environment, use nodemailer or a service like SendGrid/AWS SES.
 */

const sendEmail = async ({ to, subject, body }) => {
  console.log("-----------------------------------------");
  console.log(`EMULATION: Sending Email to ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  console.log("-----------------------------------------");
  return { success: true };
};

module.exports = {
  sendEmail,
};
