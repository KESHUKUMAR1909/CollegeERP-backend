const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
    service: "gmail", // or use "smtp"
    auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS  // your Gmail app password
    }
});

// Function to send email
const sendMail = async (to, erpId) => {
    try {
        const info = await transporter.sendMail({
            from: `"College ERP" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Your College ERP Unique ID",
            text: `Welcome to College ERP! Your unique ERP ID is: ${erpId}`,
            html: `<p>Welcome to <b>College ERP</b> 🎓</p>
                   <p>Your unique ERP ID is: <b>${erpId}</b></p>`
        });

        console.log("✅ Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
        throw error;
    }
};

module.exports = { sendMail };
