import connect from "@/app/_library/mongodb";
import User from "@/app/_library/modals/user";
import { redirect } from 'next/navigation'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'

export async function POST(req) {
    await connect()

    try {
      
        const body = await req.json();  

        //check if email exists
        const user = await User.findOne({email:body.email})
        if(!user){
            return Response.json({
                message: "Email does not exist"}, 
            {status: 400})
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(body.password, user.password)
        if(!validPassword){
            return Response.json({
                message: "Invlid password"}, 
            {status: 400})            
        }

        //create token data
        const tokenData = {
            id: user._id,            
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "12h"})  // 1d, 12h, 30m, 30s, 120
        
        const cookieStore = await cookies()
        cookieStore.set('token', token, { httpOnly: true })        

        return Response.json({ 
            token:token,
            message: "Login successful",
        },{status: 200})       
        
    } catch (err) {
        return Response.json({ 
            error: err.message
        }, {status: 500})          
    }    
}