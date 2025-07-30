import { redirect } from 'next/navigation'
import connect from "@/app/_library/mongodb";
import Company from "@/app/_library/modals/company";
import CompanyUser from "@/app/_library/modals/company_user";
import AllFunctionServer from "@/app/_library/AllFunctionServer";

export async function GET(req){
    await connect()
    try {  
        const searchParams = req.nextUrl.searchParams  
        const _id = searchParams.get('_id')
        
        if(_id){
            const res = await Company.findOne({_id})
            .populate('services');            
            return Response.json({                 
                data: res,            
            },{status: 200})                  
        }        

        const limit  = AllFunctionServer.limit()
        const page = ( searchParams.get('page') == '' ) ? 1 : searchParams.get('page')
        const offset = (page - 1) * limit;

        const name = searchParams.get('name')
        const email = searchParams.get('email')
        const zipcode = searchParams.get('zipcode')
        const status = searchParams.get('status')

        let filterObj = {}
        if(name){
            filterObj['name'] = { $regex: '.*' + name + '.*' } 
        }       
        if(zipcode){
            filterObj['zipcode'] = { $regex: '.*' + zipcode + '.*' } 
        }
        if(status){
            filterObj['status'] = status
        }
        if(email){           
           const res = await CompanyUser.findOne({ email: { $regex: '.*' + email + '.*' } }).exec(); 
           filterObj['user'] =  (res) ? { $in: res._id } : email            
        }
        
        const total = await Company.countDocuments(filterObj).exec();
        const res = await Company.find(filterObj)        
        .populate({
            path: 'user', 
            // match: (email) ? {            
            //     email: { $regex: '.*' + email + '.*' } ,                 
            // } : {},            
            // select: '_id first_name last_name email',            
            //options: { sort: { email: 1 }, limit: 5 }
        })
        .skip(offset)
        .limit(limit)
        .sort({ name: 1 }) // 1 : asc, -1 : desc
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
        const user = formData.get('user')  
        const services = JSON.parse(formData.get('services'));
        const name = formData.get('name')
        const nif = formData.get('nif')
        const zipcode = formData.get('zipcode')
        const address = formData.get('address')   
        const description = formData.get('description')  
        const status = (formData.get('status')) ? formData.get('status') : 0        

        const bodyObj = { user, services, name, nif, zipcode, address, description, status }
        const res = await Company.insertOne(bodyObj);        
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
        const user = formData.get('user')  
        const services = JSON.parse(formData.get('services'));
        const name = formData.get('name') 
        const nif = formData.get('nif')
        const zipcode = formData.get('zipcode')
        const address = formData.get('address')   
        const description = formData.get('description') 
        const status = (formData.get('status')) ? formData.get('status') : 0        

        const bodyObj = { user, services, name, nif, zipcode, address, description, status }
        const res = await Company.findByIdAndUpdate(_id, bodyObj, {new: true})
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
        const res = await Company.findByIdAndDelete(_id);
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