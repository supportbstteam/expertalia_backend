import connect from "@/app/_library/mongodb";
import User from "@/app/_library/modals/user";

export async function POST(req) {
    await connect()
    try {      
        const reqBody = await req.json();          
        const { token } = reqBody
        const user = await User.findOne({verify_email_token: token, verify_email_token_expiry: {$gt: Date.now()}});

        if(!user){
            return Response.json({
                error: "Invalid token"}, 
            {status: 400})           
        }

        // Update user 
        user.email_verified = true;
        user.verify_email_token = '';
        user.verify_email_token_expiry = '';
        await user.save();

        return Response.json({
            message: "Email Verified successfully",            
        },{status: 200})        
        
    } catch (err) {
        return Response.json({ 
            error: err.message
        }, {status: 500})          
    }    
}