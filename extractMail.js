import { tool } from "@langchain/core/tools";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import { configDotenv } from "dotenv";
import z from "zod";

configDotenv();

//Extract Latest mail
export const getLatestEmail = tool(
  async ({ limit }) => {
    const client = new ImapFlow({
      host: "imap.gmail.com",
      port: 993,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: false,
    });

    try {
      await client.connect();

      const lock = await client.getMailboxLock("INBOX");

      try {
        const uids = await client.search(
          { seen: false },
          { uid: true }
        );

        if (!uids || uids.length === 0) {
          return "No unread emails found.";
        }

        // Select latest UIDs, newest first
        const latestUids = uids.slice(-limit).reverse();

        const emails = [];

        for (const uid of latestUids) {
          const message = await client.fetchOne(
            String(uid),
            { source: true },
            { uid: true }
          );

          if (!message) continue;

          const email = await simpleParser(message.source);

          emails.push({
            senderEmail: email.from?.value?.[0]?.address ?? "",
            senderName: email.from?.text ?? "",
            subject: email.subject ?? "",
            body: (email.text ?? "").slice(0, 2000),
            date: email.date?.toISOString() ?? "",
          });
        }
        return JSON.stringify(emails, null, 2);
      } finally {
        lock.release();
      }
    } catch (error) {
      return `Email extraction failed: ${error.message}`;
    } finally {
      if (client.usable) {
        await client.logout();
      }
    }
  },
  {
    name: "get_latest_email",
    description:
      "Get the latest unread emails from Gmail. Accepts a limit, defaulting to 2.",
    schema: z.object({
      limit: z.number().int().min(1).max(10).default(2),
    }),
  }
);

