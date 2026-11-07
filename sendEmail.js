import { tool } from "@langchain/core/tools";
import nodemailer from "nodemailer/lib/nodemailer";
import z from "zod";

// Email Sending Tool
export const emailSend = tool(
    async ({ receiverEmail, subject, mailContent }) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      try {
        const info = await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: receiverEmail,
          subject,
          text: mailContent,
        });
  
        return `Email sent successfully to ${receiverEmail}. Message ID: ${info.messageId}`;
      } catch (error) {
        return `Email sending error: ${error.message}`;
      }
    },
    {
      name: "email_send",
      description: "Send a reply to the original sender of an extracted email.",
      schema: z.object({
        receiverEmail: z.email().describe("Original sender email address"),
        subject: z.string().describe("Reply subject"),
        mailContent: z.string().describe("Generated reply content"),
      }),
    }
  );
  