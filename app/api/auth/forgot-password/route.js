import connect from "@/app/_library/mongodb";
import User from "@/app/_library/modals/user";
import bcryptjs from "bcryptjs";
import sendEmail from "@/app/_library/mailer";

export async function POST(req) {
    await connect()

    try {        
       
        //=== for jsondata ===  
        const body = await req.json();  

        //Checks if a user with the provided email already exists.    
        const user = await User.findOne({email:body.email})
        if(!user){
            return Response.json({
                message: "This email id is not registered"}, 
            {status: 400})
        }
        const userId = user._id      

        //=== send verification email [start] ====       
        const emailToken = await bcryptjs.hash(`${userId}`, 10)  
        const mailResponse = await sendEmail({
            email:body.email, 
            subject:'Reset your password',
            content:`<p>Click <a href="${process.env.APP_URL}/reset-password?token=${emailToken}">here</a> to Reset your password</p>`
        })  

        const mailStatus = mailResponse.status ?? ''    

        if(mailStatus == 'success'){

            await User.findByIdAndUpdate(userId,{
                forgot_password_token: emailToken,
                forgot_password_token_expiry: Date.now() + 3600000
                },
            )

            return Response.json({ 
                message: "a password reset link is sent to your email address please check the link and reset your password",
            },{status: 200})

        }
        else{
            return Response.json({                         
                message: mailResponse,
            },{status: 400})
        }        
        //=== send verification email [ends] ====        
        
    } catch (err) {
        return Response.json({ 
            error: err.message
        }, {status: 500})          
    }    
}