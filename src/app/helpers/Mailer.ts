import nodemailer from 'nodemailer';


export default async function sendMail({email, emailType, userId}: any){
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

        const mailOptions = {
                from: '', 
                to: email, 
                subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password " , 
                text: "Hello world?", 
                html: "<b>Hello world?</b>",
        }

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;
          
    } catch (error:unknown) {
        console.error("Error sending email:",error);    
        
    }
}