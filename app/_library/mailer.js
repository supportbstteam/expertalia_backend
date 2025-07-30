import nodemailer from "nodemailer"

const sendEmail = async (obj) =>{
    try {
        
        var transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,    
            secure: false, // true for 465, false for other ports        
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });
       
        const mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS,
            to: obj.email ?? '',
            subject: obj.subject ?? '',
            html: obj.content ?? '',
        }

        // Send the email
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse
       
    } catch (error) {
        //throw new Error(error.message)   
        return error.message     
    }
}
export default sendEmail;