import nodemailer from 'nodemailer'
import { generateAIPlaybook } from './playbook-ai-service'
import type { ChatMessage } from '../../server/api/types/chat'

export const sendPlaybook = async (email: string, messages: ChatMessage[]) => {
  const playbook = await generateAIPlaybook(messages)

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

  const formatSection = (content: string[]) => {
    let html = '<ul class="recommendations">'
    content.forEach(item => {
      const trimmedItem = item.trim()
      if (trimmedItem.startsWith('-') || trimmedItem.startsWith('•')) {
        // List item
        html += `<li>${trimmedItem.substring(1).trim()}</li>`
      } else if (trimmedItem.includes(':')) {
        // Subheading
        const [heading, ...rest] = trimmedItem.split(':')
        html += `</ul><h3 class="subheading">${heading.trim()}:</h3><ul class="recommendations">`
        if (rest.length > 0) {
          html += `<li>${rest.join(':').trim()}</li>`
        }
      } else {
        // Regular paragraph
        html += `</ul><p>${trimmedItem}</p><ul class="recommendations">`
      }
    })
    html += '</ul>'
    return html.replace(/<ul class="recommendations"><\/ul>/g, '')
  }

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
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding: 40px 0;
            background: linear-gradient(135deg, #00ff9d, #7c3aed, #ff006e);
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #1f2937;
            padding: 40px;
            border-radius: 0 0 8px 8px;
          }
          h1 {
            color: #ffffff;
            margin: 0;
            font-size: 32px;
            font-weight: bold;
          }
          h2 {
            color: #00ff9d;
            margin-top: 40px;
            font-size: 24px;
            border-bottom: 2px solid #00ff9d;
            padding-bottom: 10px;
          }
          h3.subheading {
            color: #ff006e;
            margin: 25px 0 15px;
            font-size: 18px;
          }
          .highlight {
            color: #00ff9d;
            font-weight: bold;
          }
          .accent {
            color: #ff006e;
            font-weight: bold;
          }
          .section {
            margin: 30px 0;
            padding: 25px;
            background-color: #2d3748;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .divider {
            height: 3px;
            background: linear-gradient(90deg, #00ff9d, #7c3aed, #ff006e);
            margin: 30px 0;
            border-radius: 3px;
          }
          ul.recommendations {
            list-style-type: none;
            padding-left: 0;
            margin: 15px 0;
          }
          ul.recommendations li {
            margin: 12px 0;
            padding-left: 25px;
            position: relative;
            color: #e2e8f0;
          }
          ul.recommendations li:before {
            content: "→";
            color: #7c3aed;
            position: absolute;
            left: 0;
          }
          .summary {
            font-size: 18px;
            line-height: 1.8;
            padding: 25px;
            background: rgba(124, 58, 237, 0.1);
            border-radius: 8px;
            margin: 20px 0;
            color: #e2e8f0;
          }
          p {
            color: #e2e8f0;
            margin: 15px 0;
          }
          .intro {
            font-size: 18px;
            line-height: 1.8;
            margin: 25px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Personalized Business Growth Playbook 🚀</h1>
          </div>
          <div class="content">
            <p class="intro">Hey there,</p>
            <p class="intro">I've analyzed our conversation and created a comprehensive, personalized playbook for your business journey. This isn't just a generic template - it's a strategic roadmap tailored to your unique situation and goals.</p>
            
            <div class="divider"></div>
            
            <div class="summary">
              <h2>Executive Summary</h2>
              <p>${playbook.executiveSummary}</p>
            </div>

            <div class="divider"></div>
            
            <h2>${playbook.businessModel.title}</h2>
            <div class="section">
              ${formatSection(playbook.businessModel.content)}
            </div>

            <h2>${playbook.automationStrategy.title}</h2>
            <div class="section">
              ${formatSection(playbook.automationStrategy.content)}
            </div>

            <h2>${playbook.growthRoadmap.title}</h2>
            <div class="section">
              ${formatSection(playbook.growthRoadmap.content)}
            </div>

            <h2>${playbook.riskMitigation.title}</h2>
            <div class="section">
              ${formatSection(playbook.riskMitigation.content)}
            </div>

            <h2>${playbook.scalingFramework.title}</h2>
            <div class="section">
              ${formatSection(playbook.scalingFramework.content)}
            </div>

            <div class="divider"></div>
            
            <p class="intro">This playbook is your foundation for building a sustainable, automated business. Each section contains actionable steps and strategic insights tailored to your situation.</p>
            
            <p class="intro">Remember, this is just the beginning. Continue our conversation in the chat for more specific guidance and answers to your questions as you implement these strategies.</p>
            
            <p class="intro">To your success,<br>Chris</p>
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
