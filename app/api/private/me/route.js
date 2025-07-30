import connect from "@/app/_library/mongodb";
import User from "@/app/_library/modals/user";
import Role from "@/app/_library/modals/role";

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import tokenHelper from '@/app/_library/tokenHelper';

export async function GET(req){
    await connect()    
    try { 

        const userId = await tokenHelper.getDataFromToken('token');
        const user = await User.findOne({_id: userId})
        .populate('role')
        .select(['-password'])
        .exec();        
        
        return Response.json({ 
            data: user,
        },{status: 200})       

    } catch (err) {
        return Response.json({ 
            message: err.message
        })          
    }       
}