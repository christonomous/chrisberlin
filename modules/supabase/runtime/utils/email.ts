import nodemailer from 'nodemailer'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

const transporter = nodemailer.createTransport({
  host: config.email.smtp.host,
  port: config.email.smtp.port,
  secure: config.email.smtp.secure,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
})

export const sendWelcomeEmail = async (email: string, unsubscribeToken: string) => {
  const mailOptions = {
    from: `"${config.email.name}" <${config.email.user}>`,
    to: email,
    subject: 'Welcome to the newsletter!',
    html: `
      <h1>Welcome to Chris Berlin Newsletter!</h1>
      <p>Thank you for subscribing to our newsletter. You'll receive updates about new launches and features.</p>
      <p>If you wish to unsubscribe, <a href="${config.public.siteUrl}/api/unsubscribe?token=${unsubscribeToken}">click here</a></p>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error: any) {
    console.error('Error sending welcome email:', error)
    throw error
  }
}
