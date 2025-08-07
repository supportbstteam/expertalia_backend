import { redirect } from 'next/navigation'
import connect from "@/app/_library/mongodb";
import CompanyUser from "@/app/_library/modals/company_user";
import User from "@/app/_library/modals/user";
import AllFunctionServer from "@/app/_library/AllFunctionServer";
import bcryptjs from "bcryptjs";

export async function GET(req){
    await connect()
    try {  
        const searchParams = req.nextUrl.searchParams  

        const search_text = searchParams.get('search_text')        

        const limit  = AllFunctionServer.limit()
        const page = ( searchParams.get('page') == '' ) ? 1 : searchParams.get('page')
        const offset = (page - 1) * limit;       

        let filterObj = {}
        if(search_text){
            filterObj['first_name'] = { $regex: '.*' + search_text + '.*' } 
            filterObj['last_name'] = { $regex: '.*' + search_text + '.*' } 
            filterObj['email'] = { $regex: '.*' + search_text + '.*' } 
            filterObj['phone'] = { $regex: '.*' + search_text + '.*' } 
        }       
        
        const total = await User.countDocuments(filterObj).exec();
        const res = await User.find(filterObj,{ password: 0})
        //.skip(offset)
        //.limit(limit)
        .sort({ name: 1 }) // 1 : asc, -1 : desc
        .exec(); 
        
        return Response.json({ 
            total:total,
            data: res,            
        },{status: 200})     

    } catch (err) {
        return Response.json({ 
            error: err.message
        }, {status: 500})        
    }      
}
 
export async function POST(req) {}
export async function PATCH(req) {}
export async function DELETE(req) {} 
export async function PUT(req) {} 