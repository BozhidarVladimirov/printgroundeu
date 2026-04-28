import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      type,
      name,
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
      additionalInfo,
      subject,
      message,
      products
    } = body

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json({ 
        error: 'Email service not configured'
      }, { status: 500 })
    }

    const to = process.env.EMAIL_TO || 'info@printground.net'
    const from = process.env.EMAIL_FROM || 'info@printground.net'
    const senderName = name || contactName || 'Website Visitor'
    const senderEmail = email || 'noreply@printground.net'
    
    let emailSubject: string
    let emailHtml: string
    
    if (type === 'contact') {
      emailSubject = `New Contact Form Message from ${senderName}`
      emailHtml = `
        <h2>New Contact Form Message</h2>
        <hr />
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
        <hr />
        <h3>Message Details</h3>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Products of Interest:</strong> ${products || 'N/A'}</p>
        <hr />
        <h3>Message</h3>
        <p style="white-space: pre-wrap;">${message || 'No message provided'}</p>
      `
    } else {
      emailSubject = `New Quote Request from ${senderName}${companyName ? ` - ${companyName}` : ''}`
      emailHtml = `
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
    }
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${senderName} <${from}>`,
        to: [to],
        reply_to: senderEmail,
        subject: emailSubject,
        html: emailHtml,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Resend error:', errorData)
      throw new Error(`Resend error: ${JSON.stringify(errorData)}`)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Email error:', error)
    return NextResponse.json({ 
      error: 'Failed to send email',
      details: error?.message 
    }, { status: 500 })
  }
}