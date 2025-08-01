import { createError, defineEventHandler, readBody } from 'h3'
import { z } from 'zod'
import { EmailClient, type EmailMessage } from '@azure/communication-email'

const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  message: z.string().min(10, { message: 'Please enter a longer message' }),
  honeypot: z.string().optional(),
})

const acsConnectionString = process.env.ACS_CONNECTION_STRING!
const senderAddress = process.env.ACS_SENDER_EMAIL!
const yourEmail = process.env.YOUR_EMAIL!

export default defineEventHandler(async event => {
  try {
    // Read the raw body first
    const body = await readBody(event)

    // Then validate with Zod using safeParse
    const validation = contactFormSchema.safeParse(body)

    if (!validation.success) {
      // Transform Zod validation errors to a format the frontend can use
      const validationErrors: Record<string, string> = {}

      validation.error.issues.forEach(issue => {
        if (issue.path && issue.path.length > 0) {
          const fieldName = issue.path[0] as string
          validationErrors[fieldName] = issue.message
        }
      })

      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Error',
        data: validationErrors,
      })
    }

    const validatedData = validation.data

    const emailClient = new EmailClient(acsConnectionString)

    // Send notification to you
    const adminMessage: EmailMessage = {
      senderAddress,
      content: {
        subject: `New Contact Form Submission from ${validatedData.name}`,
        plainText: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nMessage: ${validatedData.message}`,
        html: `<p><strong>Name:</strong> ${validatedData.name}</p><p><strong>Email:</strong> ${validatedData.email}</p><p><strong>Message:</strong> ${validatedData.message}</p>`,
      },
      recipients: {
        to: [{ address: yourEmail }],
      },
    }
    const adminResponse = await emailClient.beginSend(adminMessage)

    // Send confirmation to user
    const userMessage: EmailMessage = {
      senderAddress,
      content: {
        subject: 'Thank you for reaching out!',
        plainText: `Hi ${validatedData.name},\n\nThank you for reaching out. We received your message.`,
        html: `<div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <tr>
            <td style="background: #2563eb; color: #fff; padding: 24px 32px; border-radius: 8px 8px 0 0; font-size: 24px; font-weight: bold;">
              Thank you for contacting us!
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 18px; margin: 0 0 16px 0;">Hi ${validatedData.name},</p>
              <p style="font-size: 16px; color: #333; margin: 0 0 16px 0;">
                We have received your message and appreciate you reaching out. Our team will review your inquiry and get back to you as soon as possible.
              </p>
              <p style="font-size: 16px; color: #333; margin: 0 0 16px 0;">
                <strong>Your message:</strong><br>
                <span style="background: #f1f5f9; display: block; padding: 12px; border-radius: 4px; margin-top: 8px; color: #555;">
                  ${validatedData.message}
                </span>
              </p>
              <p style="font-size: 16px; color: #333; margin: 32px 0 0 0;">
                Best regards,<br>
                Jarne Delarue
              </p>
            </td>
          </tr>
          <tr>
            <td style="background: #f1f5f9; color: #888; padding: 16px 32px; border-radius: 0 0 8px 8px; font-size: 13px; text-align: center;">
              &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
            </td>
          </tr>
        </table>
      </div>`,
      },
      recipients: {
        to: [{ address: validatedData.email }],
      },
    }
    const userResponse = await emailClient.beginSend(userMessage)
    // fire and forget

    return { success: true }
  } catch (error: any) {
    console.error('Full error object:', error)

    // If it's already a createError with validation data, just re-throw it
    if (error.statusCode === 400 && error.data) {
      throw error
    }

    // Handle other types of errors
    console.error('Unexpected error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'An unexpected error occurred',
    })
  }
})
