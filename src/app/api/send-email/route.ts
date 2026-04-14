import { NextResponse } from 'next/server'

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

    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json({ 
        error: 'Email service not configured'
      }, { status: 500 })
    }

    const SENDGRID_ENDPOINT = 'https://api.sendgrid.com/v3/mail/send'
    
    const data = {
      personalizations: [{
        to: [{ email: process.env.SENDGRID_TO || 'info@printground.net' }],
      }],
      from: { email: process.env.SENDGRID_FROM || 'info@printground.net', name: 'PrintGround EU' },
      reply_to: { email: email },
      subject: `New Quote Request from ${contactName}${companyName ? ` - ${companyName}` : ''}`,
      content: [{
        type: 'text/html',
        value: `
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
      }]
    }

    const response = await fetch(SENDGRID_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`SendGrid error: ${response.status}`)
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
