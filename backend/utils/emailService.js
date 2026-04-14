const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const path = require("path");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const loadTemplate = async (templateName, data = {}) => {
  const filePath = path.join(__dirname, "../emails", `${templateName}.html`);
  let html = await fs.readFile(filePath, "utf-8");
  
  for (const key in data) {
    const regex = new RegExp(`{{${key}}}`, "g");
    html = html.replace(regex, data[key]);
  }
  return html;
};

const sendEmail = async ({ to, subject, body, template, templateData }) => {
  try {
    let htmlContent = body;
    if (template) {
      htmlContent = await loadTemplate(template, templateData);
    }

    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to,
      subject,
      text: body,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
};
