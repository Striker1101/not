const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const path = require("path");

// Create a transporter instance lazily to ensure ENV vars are loaded
let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const config = {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || "587"),
    secure: process.env.MAIL_PORT == "465", // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false // Helps in restricted network environments
    }
  };

  console.log("📧 Initializing SMTP Transporter...");
  console.log(`📡 Host: ${config.host}:${config.port}`);
  console.log(`👤 User: ${config.auth.user}`);

  transporter = nodemailer.createTransport(config);
  return transporter;
};

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
    const mailServer = getTransporter();
    
    let htmlContent = body;
    if (template) {
      htmlContent = await loadTemplate(template, templateData);
    }

    const fromName = (process.env.MAIL_FROM_NAME || "Block Art NFT").replace(/"/g, '');
    const fromAddress = process.env.MAIL_FROM_ADDRESS || "support@blockartnft.com";

    const mailOptions = {
      from: `"${fromName}" <${fromAddress}>`,
      to,
      subject,
      text: body || "Please view this email in an HTML compatible viewer.",
      html: htmlContent,
    };

    console.log(`📤 Attempting to send email to: ${to}...`);
    const info = await mailServer.sendMail(mailOptions);
    console.log("✅ Message sent successfully! ID: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ SMTP Error:", error.message);
    if (error.code === 'EAUTH') {
        console.error("🔑 Authentication failed. Please check your MAIL_USERNAME and MAIL_PASSWORD in .env");
    }
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
};
