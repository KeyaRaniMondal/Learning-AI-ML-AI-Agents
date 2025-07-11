import nodemailer from 'nodemailer'

export const sendMail=async(to,subject,text)=>{
try{
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.AILTRAP_SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.AILTRAP_SMTP_USER,
            pass: process.env.AILTRAP_SMTP_PASS,
        },
      });

    const info = await transporter.sendMail({
        from: 'Inngest TMS',  //TMS=Transport Mail Service
        to,
        subject,
        text, // plain‑text body
    });

    console.log("Message sent:", info.messageId);
    return info
}
catch(error){
console.error("Mail errrorr",error.message)
throw error
}
}