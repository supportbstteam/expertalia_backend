import connect from "@/app/_library/mongodb";
import User from "@/app/_library/modals/user";
import { redirect } from 'next/navigation'
import bcryptjs from "bcryptjs";
//import sendEmail from "@/app/_library/emailjs";
import sendEmail from "@/app/_library/mailer";

export async function GET(req){

    await connect()    
    try {       
        const users = await User.find();         
        return Response.json({ 
            data: users
        })
    } catch (err) {
        return Response.json({ 
            message: err.message
        })          
    }       
}
 
export async function POST(req) {
    await connect()

    try {
        
        // //=== for formdata ===
        // const formData = await req.formData()
        // const name = formData.get('name')
        // const email = formData.get('email')
        // const password = formData.get('password')
        // const body = { name, email, password }
        // const newUser = await User.insertOne(body); 
        // return Response.json({ 
        //     data: newUser
        // })
        
        //=== for jsondata ===  
        const body = await req.json();  

        //Checks if a user with the provided email already exists.    
        const user = await User.findOne({email:body.email})
        if(user){
            return Response.json({
                message: "This email id is already registered"}, 
            {status: 400})
        }

        //=== send verification email [start] ====
        /*
        const timestring = new Date().getTime(); 
        const emailToken = await bcryptjs.hash(`${timestring}`, 10)  
        const mailResponse = await sendEmail({
            email:body.email, 
            subject:'Verify your email',
            content:`<p>Click <a href="${process.env.APP_URL}/verifyemail?token=${emailToken}">here</a> to Verify your email</p>`
        })   
        const mailStatus = mailResponse.status ?? ''    

        if(mailStatus == 'success'){

            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(body.password, salt) 
            body['password'] = hashedPassword

            const newUser = await User.insertOne(body);             
            const userId = newUser._id           
            await User.findByIdAndUpdate(userId,{
                verify_email_token: emailToken,
                verify_email_token_expiry: Date.now() + 3600000
                },
            )

            return Response.json({ 
                message: "a verification email is sent to your email address please check the link and verify your email",
            },{status: 200})

        }
        else{
            return Response.json({                         
                message: mailResponse,
            },{status: 400})
        }    
        */    
        //=== send verification email [ends] ====

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(body.password, salt) 
        body['password'] = hashedPassword
        const newUser = await User.insertOne(body);  
           
        return Response.json({ 
            data: newUser,
            message: "User created successfully",
        },{status: 200})        
        
    } catch (err) {
        return Response.json({ 
            error: err.message
        }, {status: 500})          
    }    
}
 
export async function PUT(request) {} 
export async function DELETE(request) {} 
export async function PATCH(request) {}