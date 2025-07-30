import { redirect } from 'next/navigation'
import connect from "@/app/_library/mongodb";
import ServiceCategory from "@/app/_library/modals/service_category";
import AllFunctionServer from "@/app/_library/AllFunctionServer";

export async function GET(req){
    await connect()
    try {  
        const searchParams = req.nextUrl.searchParams  
        const _id = searchParams.get('_id')
        
        if(_id){
            const res = await ServiceCategory.findOne({_id});             
            return Response.json({                 
                data: res,            
            },{status: 200})                  
        }        

        const limit  = AllFunctionServer.limit()
        const page = ( searchParams.get('page') == '' ) ? 1 : searchParams.get('page')
        const offset = (page - 1) * limit;

        const name = searchParams.get('name')        
        const status = searchParams.get('status')

        let filterObj = {}
        if(name){
            filterObj['name'] = { $regex: '.*' + name + '.*' } 
        }  
        if(status){
            filterObj['status'] = status
        }
        
        const total = await ServiceCategory.countDocuments(filterObj).exec();
        const res = await ServiceCategory.find(filterObj)        
        .skip(offset)
        .limit(limit)
        .sort({ name: 1 }) 
        .exec()       
        
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
 
export async function POST(req) {
    await connect()

    try {
        
        //=== for formdata ===
        const formData = await req.formData()  
        const name = formData.get('name')       
        const status = (formData.get('status')) ? formData.get('status') : 0        

        const bodyObj = { name, status }
        const res = await ServiceCategory.insertOne(bodyObj);        
        return Response.json({ 
            data: res,            
        },{status: 200})  
             
    } catch (err) {       
        let errors = {}        
        if(err?.errors){
            Object.entries(err?.errors).forEach(([key, value]) => {                
                errors[key] = value.message
            });
        }
        return Response.json({ 
            errors: (Object.keys(errors).length !== 0) ? errors : '',
            message: err.message
        },{status: 500})          
    }    
}
export async function PATCH(req) {
    await connect()

    try {
        
        //=== for formdata ===
        const formData = await req.formData()  
        const _id = formData.get('_id') 
        const name = formData.get('name')        
        const status = (formData.get('status')) ? formData.get('status') : 0        

        const bodyObj = { name, status }
        const res = await ServiceCategory.findByIdAndUpdate(_id, bodyObj, {new: true})
        return Response.json({ 
            data: res,
            message: "data Updated successfully",
        },{status: 200}) 
             
    } catch (err) {       
        let errors = {}        
        if(err?.errors){
            Object.entries(err?.errors).forEach(([key, value]) => {                
                errors[key] = value.message
            });
        }
        return Response.json({ 
            errors: (Object.keys(errors).length !== 0) ? errors : '',
            message: err.message
        },{status: 500})          
    }    
}
export async function DELETE(req) {
    await connect()
    const searchParams = req.nextUrl.searchParams 
    const _id = searchParams.get('_id')

    try {  
        const res = await ServiceCategory.findByIdAndDelete(_id);
         return Response.json({            
            message: "data deleted successfully",
        },{status: 200}) 
    }
    catch(err){
        return Response.json({             
            message: err.message
        },{status: 500})          
    }
} 
export async function PUT(req) {} 