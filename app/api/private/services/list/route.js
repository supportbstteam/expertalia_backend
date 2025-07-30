import { redirect } from 'next/navigation'
import connect from "@/app/_library/mongodb";
import Service from "@/app/_library/modals/service";
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
        
        const services = await Service.find(filterObj,{})   
        .populate('category')    
        //.limit(limit)
        .sort({ name: 1 })
        .exec(); 
        
        
        let catArr = []
        const groupedData = services.reduce((acc, item) => {
            if (!acc[item.category._id]) {
                acc[item.category._id] = [];
            }
            catArr[item.category._id] = item.category
            acc[item.category._id].push(item); 
            return acc;
        }, {});
        
        let returnArr = []
        Object.entries(groupedData).forEach(([key, value]) => {
            returnArr.push({
                category:catArr[key],
                services:value,
            })  
        });
                
        return Response.json({ 
            data: returnArr,            
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