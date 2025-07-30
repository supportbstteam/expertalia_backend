import { SMTPClient } from 'emailjs';

const sendEmail = async (obj) =>{
    try {
        const client = new SMTPClient({
            user: process.env.MAIL_USERNAME,
            password: process.env.MAIL_PASSWORD,
            host: process.env.MAIL_HOST,
            ssl: true,
        });

        const res = await client.sendAsync({
            text: obj.content ?? '',
            from: process.env.MAIL_FROM_ADDRESS,
            to: obj.email ?? '',
            //cc: 'else <else@your-email.com>',
            subject: obj.subject ?? '',
        })
        console.log(res)   
        return res   
       
    } catch (error) {
       console.error(error);
       return error   
    }
}
export default sendEmail;