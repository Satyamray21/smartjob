import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.gmail,
            pass: process.env.app_pass,
        },
    });

    const mailOptions = {
        from: `"SmartJob Team" <${process.env.gmail}>`,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;