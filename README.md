# 📧 EmailSender_Agent

**EmailSender_Agent** is an AI-powered email automation agent built with JavaScript and Node.js. It uses Large Language Models (LLMs) to understand user instructions, process emails, and assist with generating intelligent email responses.

The project integrates email communication tools with AI capabilities to simplify email management and automate repetitive email-related tasks.

## 🚀 Features

- **Email Reading:** Fetch and read emails directly from the Gmail inbox using IMAP.
- **Unread Email Detection:** Identify and retrieve unread emails.
- **Important Email Filtering:** Search and extract important emails.
- **Email Parsing:** Extract sender name, sender email, subject, message body, and date.
- **AI-Powered Responses:** Use an AI agent to understand prompts and generate email responses.
- **Email Sending:** Send emails programmatically using Nodemailer.
- **Interactive CLI:** Communicate with the AI agent through a terminal-based interface.
- **Error Handling:** Handle email connection, parsing, and AI agent errors.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| JavaScript (ES6+) | Core programming language |
| Node.js | Backend runtime |
| LangChain.js | AI agent development |
| Groq / LLM | AI-powered text generation |
| ImapFlow | Fetching emails through IMAP |
| Mailparser | Parsing email content |
| Nodemailer | Sending emails |
| Readline/Promises | Interactive terminal input |
| dotenv | Environment variable management |

## 📂 Project Structure

```text
EmailSender_Agent/
│
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── index.js
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/MdAffanAlam/EmailSender_Agent.git
```

### 2. Navigate to the Project Directory

```bash
cd EmailSender_Agent
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

GROQ_API_KEY=your_groq_api_key
```

**Note:** Use a Gmail App Password instead of your regular Gmail password when connecting through IMAP/SMTP.

### 5. Run the Project

```bash
node index.js
```

## 🔄 How It Works

1. The application connects to the Gmail server using IMAP.
2. It accesses the inbox and searches for unread or important emails.
3. ImapFlow fetches the email source.
4. Mailparser extracts the email details and message body.
5. The extracted email content can be processed by the AI agent.
6. The LLM understands the context and generates an appropriate response.
7. Nodemailer can be used to send the generated email through SMTP.

## 💡 Example Usage

```text
Prompt: Generate a professional reply to this email.

AI Agent:
Subject: Re: Job Application

Dear Hiring Manager,

Thank you for considering my application.
I appreciate the opportunity and look forward
to hearing from you.

Best regards,
Affan
```

## 🔐 Security

- Store API keys and email credentials in environment variables.
- Never upload `.env` files to GitHub.
- Use Gmail App Passwords where applicable.
- Add `.env` to `.gitignore`.

## 🔮 Future Improvements

- Automatic email reply generation.
- AI-based email classification.
- Email summarization.
- Priority-based email management.
- Personalized email responses.
- Automated email scheduling.
- Multi-account email support.

## 👨‍💻 Author

**MD Affan Alam**

- GitHub: [@MdAffanAlam](https://github.com/MdAffanAlam)
- Portfolio: [affandevfolio.netlify.app](https://affandevfolio.netlify.app)

---

⭐ If you find this project useful, consider giving it a star!