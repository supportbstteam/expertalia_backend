import connect from "@/app/_library/mongodb";
import User from "@/app/_library/modals/user";
import bcryptjs from "bcryptjs";

export async function POST(req) {
    await connect()
    try {      
        const reqBody = await req.json();          
        const { token, password } = reqBody
        const user = await User.findOne({forgot_password_token: token, forgot_password_token_expiry: {$gt: Date.now()}});

        if(!user){
            return Response.json({
                message: "Invalid token"}, 
            {status: 400})           
        }

        // Update user 
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt) 
       
        user.password = hashedPassword;
        user.forgot_password_token = '';
        user.forgot_password_token_expiry = '';
        await user.save();

        return Response.json({
            message: "Password updated successfully",            
        },{status: 200})        
        
    } catch (err) {
        return Response.json({ 
            error: err.message
        }, {status: 500})          
    }    
}