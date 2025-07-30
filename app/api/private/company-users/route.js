import { redirect } from 'next/navigation'
import connect from "@/app/_library/mongodb";
import CompanyUser from "@/app/_library/modals/company_user";
import AllFunctionServer from "@/app/_library/AllFunctionServer";
import bcryptjs from "bcryptjs";

export async function GET(req){
    await connect()
    try {  
        const searchParams = req.nextUrl.searchParams  

        const _id = searchParams.get('_id')
        
        if(_id){
            const res = await CompanyUser.findOne({_id});            
            return Response.json({                 
                data: res,            
            },{status: 200})                  
        }        

        const limit  = AllFunctionServer.limit()
        const page = ( searchParams.get('page') == '' ) ? 1 : searchParams.get('page')
        const offset = (page - 1) * limit;

        const first_name = searchParams.get('first_name')
        const last_name = searchParams.get('last_name')
        const email = searchParams.get('email')
        const phone = searchParams.get('phone')
        const status = searchParams.get('status')

        let filterObj = {}
        if(first_name){
            filterObj['first_name'] = { $regex: '.*' + first_name + '.*' } 
        }
        if(last_name){
            filterObj['last_name'] = { $regex: '.*' + last_name + '.*' } 
        }
        if(email){
            filterObj['email'] = { $regex: '.*' + email + '.*' } 
        }
        if(phone){
            filterObj['phone'] = { $regex: '.*' + phone + '.*' } 
        }
        if(status){
            filterObj['status'] = status
        }
        
        const total = await CompanyUser.countDocuments(filterObj).exec();
        const res = await CompanyUser.find(filterObj)
        .skip(offset)
        .limit(limit)
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
 
export async function POST(req) {
    await connect()

    try {
        
        //=== for formdata ===
        const formData = await req.formData()        
        const first_name = formData.get('first_name')
        const last_name = formData.get('last_name')
        const email = formData.get('email')
        const phone = formData.get('phone') 
        const password = formData.get('password') 
        const status = (formData.get('status')) ? formData.get('status') : 0 

        let errors = {};         
        if( first_name =='' ){
            errors.first_name  = 'First name is required';           
        }  
        if( last_name =='' ){
            errors.last_name  = 'Last name is required';           
        }  
        if( email =='' ){
            errors.email  = 'Email is required';           
        }  
        if( password.length < 6 ){
            errors.password  = 'Password must be minimum 6 characters long';           
        }   
        
        if(Object.keys(errors).length > 0){ 
            return Response.json({ 
                errors: errors,
                message: 'There is some error in form inputs'
            },{status: 500})          
        }      

        let bodyObj = { first_name, last_name, email, phone, status }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt) 
        bodyObj['password'] = hashedPassword

        const res = await CompanyUser.insertOne(bodyObj);        
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
        const first_name = formData.get('first_name')
        const last_name = formData.get('last_name')
        const email = formData.get('email')
        const phone = formData.get('phone') 
        const password = formData.get('password') 
        const status = (formData.get('status')) ? formData.get('status') : 0        
        
        let bodyObj = { first_name, last_name, email, phone, status }

        if(password){
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt) 
            bodyObj['password'] = hashedPassword
        }        

        const res = await CompanyUser.findByIdAndUpdate(_id, bodyObj, {new: true})
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
        const res = await CompanyUser.findByIdAndDelete(_id);
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