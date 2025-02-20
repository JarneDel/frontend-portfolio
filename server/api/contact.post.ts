import { defineEventHandler, readValidatedBody, createError } from 'h3'
import { z } from 'zod'
import sgMail from '@sendgrid/mail'

const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  message: z.string().min(10, { message: 'Please enter a longer message' }),
  honeypot: z.string().optional(),
})

export default defineEventHandler(async event => {
  try {
    const { data: validatedData, error } = await readValidatedBody(
      event,
      validate => contactFormSchema.safeParse(validate),
    )
    if (!validatedData) {
      return createError({
        statusCode: 400,
        message: 'Validation Error',
        data: error.format(),
      })
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    await sgMail.send({
      to: process.env.YOUR_EMAIL!,
      from: process.env.VERIFIED_SENDER!,
      subject: `New Contact Form Submission from ${validatedData.name}`,
      text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nMessage: ${validatedData.message}`,
      html: `<p><strong>Name:</strong> ${validatedData.name}</p><p><strong>Email:</strong> ${validatedData.email}</p><p><strong>Message:</strong> ${validatedData.message}</p>`,
    })

    await sgMail.send({
      to: validatedData.email,
      from: process.env.VERIFIED_SENDER!,
      templateId: process.env.SENDGRID_TEMPLATE_ID!,
      dynamicTemplateData: {
        name: validatedData.name,
        year: new Date().getFullYear(),
      },
    })

    return { success: true }
  } catch (error: any) {
    console.error('Error:', error)

    if (error.response) {
      return createError({
        statusCode: error.response.status || 500,
        message: error.response.body || 'Email sending failed',
      })
    }

    return createError({
      statusCode: 500,
      message: 'An unexpected error occurred',
    })
  }
})
