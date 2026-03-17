import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, whatsapp, business, projectType, budget, preferWhatsapp, message } = body;

    // Validate the data
    if (!name || !whatsapp || !message) {
      return NextResponse.json(
        { error: "Name, WhatsApp, and Message are required." },
        { status: 400 }
      );
    }

    // Email Configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"Arcova Studio Leads" <${process.env.EMAIL_USER}>`,
      to: "sharunattari266@gmail.com",
      subject: `New Lead: ${name} (${projectType})`,
      html: `
        <div style="font-family: sans-serif; background-color: #0A0908; color: #EDE8DF; padding: 40px; border-radius: 20px;">
          <h1 style="color: #E8A045; margin-bottom: 20px;">New Project Lead! 🚀</h1>
          <div style="background-color: #131210; padding: 30px; border-radius: 15px; border: 1px solid rgba(237, 232, 223, 0.1);">
            <p style="margin-bottom: 15px;"><strong style="color: #E8A045;">Name:</strong> ${name}</p>
            <p style="margin-bottom: 15px;"><strong style="color: #E8A045;">WhatsApp:</strong> <a href="https://wa.me/91${whatsapp}" style="color: #EDE8DF;">${whatsapp}</a></p>
            ${business ? `<p style="margin-bottom: 15px;"><strong style="color: #E8A045;">Business:</strong> ${business}</p>` : ''}
            <p style="margin-bottom: 15px;"><strong style="color: #E8A045;">Project Type:</strong> ${projectType}</p>
            <p style="margin-bottom: 15px;"><strong style="color: #E8A045;">Budget:</strong> ${budget}</p>
            <p style="margin-bottom: 15px;"><strong style="color: #E8A045;">Prefers WhatsApp:</strong> ${preferWhatsapp ? 'Yes ✅' : 'No ❌'}</p>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(237, 232, 223, 0.1);">
              <p style="color: #E8A045; font-weight: bold; margin-bottom: 10px;">Message:</p>
              <p style="line-height: 1.6; color: #EDE8DF;">${message}</p>
            </div>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #555550; text-align: center;">
            Sent with ❤️ from Arcova Studio System
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Feedback received successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
