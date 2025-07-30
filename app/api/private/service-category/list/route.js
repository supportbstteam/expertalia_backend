import { redirect } from 'next/navigation'
import connect from "@/app/_library/mongodb";
import ServiceCategory from "@/app/_library/modals/service_category";
import AllFunctionServer from "@/app/_library/AllFunctionServer";
import bcryptjs from "bcryptjs";

export async function GET(req){
    await connect()
    try {  
        const searchParams = req.nextUrl.searchParams  

        const search_text = searchParams.get('search_text')            

        let filterObj = {}
        if(search_text){
            filterObj['name'] = { $regex: '.*' + search_text + '.*' }            
        } 
        
        const res = await ServiceCategory.find(filterObj,{})         
        //.limit(limit)
        .sort({ name: 1 })
        .exec(); 
                
        return Response.json({ 
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