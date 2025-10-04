import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Check if email credentials are configured
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPassword || 
        gmailUser === 'your-email@gmail.com' || 
        gmailPassword === 'your-app-password') {
      console.log('Email credentials not configured, falling back to client-side handling');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service not configured. Using fallback method.',
          fallback: true 
        },
        { status: 200 }
      );
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    // Email content
    const emailContent = `
New Quote Request from OneTry Logistics Website

Company Details:
- Company Name: ${formData.companyName}
- Contact Person: ${formData.contactPersonName}
- Contact Number: ${formData.contactNumber}
- Email Address: ${formData.emailAddress}

Shipment Details:
- Pickup Location: ${formData.pickupLocation}
- Drop Location: ${formData.dropLocation}
- Nature of Goods: ${formData.natureOfGoods}
- Weight: ${formData.weight}
- Type of Packing: ${formData.typeOfPacking}
- Type of Load: ${formData.typeOfLoad}
- Dimensions: ${formData.dimensions}

Submitted on: ${new Date().toLocaleString()}
    `;

    // Email options
    const mailOptions = {
      from: gmailUser,
      to: 'shubham16394@gmail.com',
      subject: `New Quote Request - ${formData.companyName}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1>OneTry Logistics</h1>
            <h2>New Quote Request</h2>
          </div>
          
          <div style="padding: 20px; background-color: #f9fafb;">
            <h3 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Company Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold;">Company Name:</td><td style="padding: 8px;">${formData.companyName}</td></tr>
              <tr style="background-color: #e5e7eb;"><td style="padding: 8px; font-weight: bold;">Contact Person:</td><td style="padding: 8px;">${formData.contactPersonName}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Contact Number:</td><td style="padding: 8px;">${formData.contactNumber}</td></tr>
              <tr style="background-color: #e5e7eb;"><td style="padding: 8px; font-weight: bold;">Email Address:</td><td style="padding: 8px;">${formData.emailAddress}</td></tr>
            </table>
            
            <h3 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 30px;">Shipment Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold;">Pickup Location:</td><td style="padding: 8px;">${formData.pickupLocation}</td></tr>
              <tr style="background-color: #e5e7eb;"><td style="padding: 8px; font-weight: bold;">Drop Location:</td><td style="padding: 8px;">${formData.dropLocation}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Nature of Goods:</td><td style="padding: 8px;">${formData.natureOfGoods}</td></tr>
              <tr style="background-color: #e5e7eb;"><td style="padding: 8px; font-weight: bold;">Weight:</td><td style="padding: 8px;">${formData.weight}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Type of Packing:</td><td style="padding: 8px;">${formData.typeOfPacking}</td></tr>
              <tr style="background-color: #e5e7eb;"><td style="padding: 8px; font-weight: bold;">Type of Load:</td><td style="padding: 8px;">${formData.typeOfLoad}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Dimensions:</td><td style="padding: 8px;">${formData.dimensions}</td></tr>
            </table>
            
            <div style="margin-top: 30px; padding: 15px; background-color: #dbeafe; border-left: 4px solid #2563eb;">
              <p style="margin: 0; color: #1e40af;"><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
            </div>
          </div>
          
          <div style="background-color: #1e40af; color: white; padding: 15px; text-align: center;">
            <p style="margin: 0;">OneTry Logistics - Tried Once. Trusted Forever.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Provide specific error messages for common issues
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      if (error.message.includes('Invalid login') || error.message.includes('Username and Password not accepted')) {
        errorMessage = 'Gmail authentication failed. Please check your App Password setup.';
      } else if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
        errorMessage = 'Network connection failed. Please check your internet connection.';
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        fallback: true,
        error: process.env.NODE_ENV === 'development' ? (error as Error)?.message : undefined
      },
      { status: 200 } // Return 200 so the client can handle fallback
    );
  }
}
