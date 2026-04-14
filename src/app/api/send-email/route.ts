import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      contactName, 
      companyName, 
      email, 
      phone, 
      country,
      productCategory,
      productInterest,
      quantity,
      brandingTechnique,
      deadline,
      budget,
      additionalInfo
    } = body

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP not configured:', {
        hasHost: !!process.env.SMTP_HOST,
        hasUser: !!process.env.SMTP_USER,
        hasPass: !!process.env.SMTP_PASS,
      })
      return NextResponse.json({ 
        error: 'Email service not configured',
        debug: {
          hasHost: !!process.env.SMTP_HOST,
          hasUser: !!process.env.SMTP_USER,
          hasPass: !!process.env.SMTP_PASS,
        }
      }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const htmlContent = `
      <h2>New Quote Request</h2>
      <hr />
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${contactName || 'N/A'}</p>
      <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Country:</strong> ${country || 'N/A'}</p>
      <hr />
      <h3>Product Requirements</h3>
      <p><strong>Category:</strong> ${productCategory || 'N/A'}</p>
      <p><strong>Specific Product:</strong> ${productInterest || 'N/A'}</p>
      <p><strong>Quantity:</strong> ${quantity || 'N/A'}</p>
      <p><strong>Branding Technique:</strong> ${brandingTechnique || 'N/A'}</p>
      <p><strong>Deadline:</strong> ${deadline || 'N/A'}</p>
      <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
      <hr />
      <h3>Additional Information</h3>
      <p>${additionalInfo || 'No additional information provided'}</p>
    `

    await transporter.sendMail({
      from: `"PrintGround EU" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || 'info@printground.net',
      replyTo: email,
      subject: `New Quote Request from ${contactName}${companyName ? ` - ${companyName}` : ''}`,
      html: htmlContent,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Email error:', error)
    return NextResponse.json({ 
      error: 'Failed to send email',
      details: error?.message 
    }, { status: 500 })
  }
}
