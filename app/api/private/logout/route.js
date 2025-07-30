import connect from "@/app/_library/mongodb";
import User from "@/app/_library/modals/user";
import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'

export async function GET(req){

    //await connect()    
    try {  
        
        const cookieStore = await cookies()
        cookieStore.delete('token')   
        
        return Response.json({ 
            message: "Logout successful",
        },{status: 200})       

    } catch (err) {
        return Response.json({ 
            message: err.message
        })          
    }       
}