import { tool } from "@langchain/core/tools";
import { ChatGroq } from "@langchain/groq";
import { configDotenv } from "dotenv";
import { createAgent } from "langchain";
import nodemailer from "nodemailer/lib/nodemailer";
import readline from "node:readline/promises";
import z from "zod";
configDotenv();

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.5,
});

const emailSend = tool(
  async({recieverEmail, subject, mailContent}) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
        await transporter.verify();
        console.log("Email server is ready");

        const info = await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: recieverEmail,
          subject: subject,
          text: mailContent,
        });

        console.log("Email sent successfully!");
       
        return `Email Sent to ${recieverEmail} and messageid ${info.messageId}`
      } catch (error) {
        return `Error:", ${error.message}`;
      }


  },
  {
    name: "email_send",
    description: "Send email from sender mail address to reciever mail address",
    schema: z.object({
      recieverEmail: z.email().describe("Reciever mail address"),
      subject: z.string().describe("Subject of email"),
      mailContent: z.string().describe("Mail content"),
    }),
  }
);

const agent = createAgent({
  model,
  tools: [emailSend],
  systemPrompt:
    "You are the email sender agent/assistant that genrate mail content based on subject and send email to reciever email address using emailsend tool.",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const query = await rl.question("\nPrompt: ");
const response = await agent.invoke({
  messages: query,
});
rl.close()
// console.log("AI Agent: ",response.messages.at(-3).tool_calls[0].args);
console.log("AI Agent: ",response.messages.at(-1).content);
