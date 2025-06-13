import nodemailer from 'nodemailer'
import { useRuntimeConfig } from '#imports'

// Get runtime config
const runtimeConfig = useRuntimeConfig()

const config = {
  email: {
    smtp: {
      host: runtimeConfig.email.smtp.host,
      port: runtimeConfig.email.smtp.port,
      secure: runtimeConfig.email.smtp.secure
    },
    user: runtimeConfig.email.user,
    password: runtimeConfig.email.password,
    name: runtimeConfig.email.name
  }
}

// Log email configuration (without sensitive data)
console.log('Email Configuration:', {
  host: config.email.smtp.host,
  port: config.email.smtp.port,
  secure: config.email.smtp.secure,
  user: config.email.user
})

const transporter = nodemailer.createTransport({
  host: config.email.smtp.host,
  port: config.email.smtp.port,
  secure: config.email.smtp.secure,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
})

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Transporter verification error:', error)
  } else {
    console.log('Server is ready to send emails')
  }
})

export const sendPlaybookEmail = async (email: string, messages: any[]) => {
    // Extract insights from chat messages
    const userMessages = messages.filter(msg => msg.role === 'user')
    const insights = {
      skills: userMessages[0]?.content || '',
      goals: userMessages[1]?.content || '',
      time: userMessages[2]?.content || '',
      techComfort: userMessages[3]?.content || '',
      experience: userMessages[4]?.content || ''
    }

    // Analyze insights to generate tailored recommendations
    const recommendations = {
      mvs: [] as string[], // Minimum Viable System
      automation: [] as string[],
      growth: [] as string[]
    }

    // Analyze skills and experience
    if (insights.skills.toLowerCase().includes('writing') || insights.skills.toLowerCase().includes('content')) {
      recommendations.mvs.push('Create a premium newsletter or content membership')
      recommendations.automation.push('Set up an automated content distribution system across multiple platforms')
      recommendations.growth.push('Implement an SEO strategy focusing on your expertise topics')
    } else if (insights.skills.toLowerCase().includes('tech') || insights.skills.toLowerCase().includes('developer')) {
      recommendations.mvs.push('Develop a SaaS tool solving a specific business problem')
      recommendations.automation.push('Build a CI/CD pipeline for automated updates and maintenance')
      recommendations.growth.push('Create a developer community around your tool')
    } else if (insights.skills.toLowerCase().includes('design') || insights.skills.toLowerCase().includes('creative')) {
      recommendations.mvs.push('Create a premium template or asset marketplace')
      recommendations.automation.push('Develop an automated asset delivery and licensing system')
      recommendations.growth.push('Build a showcase portfolio with automated lead capture')
    }

    // Analyze time availability
    if (insights.time.toLowerCase().includes('full')) {
      recommendations.mvs.push('Focus on building a comprehensive system from day one')
      recommendations.automation.push('Invest time in setting up advanced automation workflows')
    } else if (insights.time.toLowerCase().includes('part') || insights.time.toLowerCase().includes('limited')) {
      recommendations.mvs.push('Start with a minimal viable offering that can run with minimal intervention')
      recommendations.automation.push('Prioritize essential automation to handle routine tasks')
    }

    // Analyze tech comfort
    if (insights.techComfort.toLowerCase().includes('high') || insights.techComfort.toLowerCase().includes('comfortable')) {
      recommendations.automation.push('Implement advanced integrations between your tools')
      recommendations.growth.push('Use API-driven automation for scalable operations')
    } else if (insights.techComfort.toLowerCase().includes('low') || insights.techComfort.toLowerCase().includes('basic')) {
      recommendations.automation.push('Start with no-code tools like Zapier or Airtable')
      recommendations.growth.push('Focus on content-driven growth with simple automation tools')
    }

    // Analyze goals
    if (insights.goals.toLowerCase().includes('passive') || insights.goals.toLowerCase().includes('freedom')) {
      recommendations.mvs.push('Design your system for maximum automation from the start')
      recommendations.growth.push('Focus on creating evergreen assets and automated marketing')
    } else if (insights.goals.toLowerCase().includes('impact') || insights.goals.toLowerCase().includes('help')) {
      recommendations.mvs.push('Create a knowledge base or resource center for your audience')
      recommendations.growth.push('Build a community-driven growth engine')
    }

    // Default recommendations if no specific patterns are found
    if (recommendations.mvs.length === 0) {
      recommendations.mvs = [
        'Start with one core offering based on your strongest skills',
        'Create a simple delivery process that can be automated',
        'Set up basic tracking for leads and conversions'
      ]
    }
    if (recommendations.automation.length === 0) {
      recommendations.automation = [
        'Choose tools that match your tech comfort level',
        'Set up automated lead capture and nurturing',
        'Create templates and systems for recurring tasks'
      ]
    }
    if (recommendations.growth.length === 0) {
      recommendations.growth = [
        'Implement passive marketing channels',
        'Create content that compounds over time',
        'Set up referral and recommendation systems'
      ]
    }

  const mailOptions = {
    from: `"${config.email.name}" <${config.email.user}>`,
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
    console.log('Attempting to send email to:', email)
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
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
