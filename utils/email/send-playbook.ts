import nodemailer from 'nodemailer'
import { generatePlaybookContent } from './playbook-generator'

interface ChatMessage {
  id: number
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

export const sendPlaybook = async (email: string, messages: ChatMessage[]) => {
  const { insights, recommendations } = generatePlaybookContent(messages)

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  // Verify SMTP connection
  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.error('SMTP verification error:', error)
        reject(error)
      } else {
        console.log('SMTP server is ready')
        resolve(success)
      }
    })
  })

  const mailOptions = {
    from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Personalized Business Growth Playbook',
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #1a1b1e;
            color: #ffffff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding: 30px 0;
            background: linear-gradient(135deg, #00ff9d, #7c3aed, #ff006e);
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #1f2937;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: bold;
          }
          h2 {
            color: #00ff9d;
            margin-top: 30px;
          }
          .highlight {
            color: #00ff9d;
            font-weight: bold;
          }
          .accent {
            color: #ff006e;
          }
          .section {
            margin: 20px 0;
            padding: 15px;
            background-color: #2d3748;
            border-radius: 8px;
          }
          .divider {
            height: 2px;
            background: linear-gradient(90deg, #00ff9d, #7c3aed, #ff006e);
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Personal Business Growth Playbook 🚀</h1>
          </div>
          <div class="content">
            <p>Hey there,</p>
            <p>Based on our conversation, I've crafted a personalized playbook for your business journey. Let's break down what we know and outline your path forward.</p>
            
            <div class="divider"></div>
            
            <h2>Your Profile</h2>
            <div class="section">
              <p><span class="highlight">Skills & Expertise:</span><br>${insights.skills}</p>
              <p><span class="highlight">Business Goals:</span><br>${insights.goals}</p>
              <p><span class="highlight">Time Availability:</span><br>${insights.time}</p>
              <p><span class="highlight">Tech Comfort Level:</span><br>${insights.techComfort}</p>
              <p><span class="highlight">Previous Experience:</span><br>${insights.experience}</p>
            </div>

            <h2>Recommended Next Steps</h2>
            <div class="section">
              <p><span class="accent">1. Define Your Minimum Viable System</span></p>
              <ul>
                ${recommendations.mvs.map(rec => `<li>${rec}</li>`).join('\n')}
              </ul>

              <p><span class="accent">2. Build Your Automation Stack</span></p>
              <ul>
                ${recommendations.automation.map(rec => `<li>${rec}</li>`).join('\n')}
              </ul>

              <p><span class="accent">3. Establish Growth Loops</span></p>
              <ul>
                ${recommendations.growth.map(rec => `<li>${rec}</li>`).join('\n')}
              </ul>
            </div>

            <div class="divider"></div>
            
            <p>This is just the beginning. Continue our conversation in the chat for more specific guidance and answers to your questions.</p>
            
            <p>To your success,<br>Chris</p>
          </div>
        </div>
      </body>
    </html>
    `
  }

  try {
    console.log('Attempting to send playbook email to:', email)
    console.log('Mail options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    })
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info)
    return info
  } catch (error: any) {
    console.error('Error sending playbook email:', error)
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response
    })
    throw error
  }
}
