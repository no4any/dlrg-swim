import nodemailer from "nodemailer";
import { SMTP_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_SECURE, SMTP_USERNAME } from "./params";

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE, // true for port 465, false for other ports
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
    },
});

export default async function mail(recepient: string, html: string) {
    return await transporter.sendMail({
        from: SMTP_FROM,
        to: recepient,
        subject: "Ihre Anmeldung zum Gießener 24 Stunden Schwimmen der DLRG",
        html: html,
    });
}