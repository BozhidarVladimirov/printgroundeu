import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, phone, product, quantity, colors, technique, message } = body

    const htmlContent = `
      <h2>New Quote Request</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <hr />
      <h3>Product Details</h3>
      <p><strong>Product:</strong> ${product || 'N/A'}</p>
      <p><strong>Quantity:</strong> ${quantity || 'N/A'}</p>
      <p><strong>Colors:</strong> ${colors || 'N/A'}</p>
      <p><strong>Branding Technique:</strong> ${technique || 'N/A'}</p>
      <hr />
      <h3>Message</h3>
      <p>${message || 'No message provided'}</p>
    `

    await transporter.sendMail({
      from: `"PrintGround EU" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || 'info@printground.net',
      replyTo: email,
      subject: `New Quote Request from ${name}${company ? ` - ${company}` : ''}`,
      html: htmlContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
