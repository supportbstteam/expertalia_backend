import { redirect } from 'next/navigation'
import connect from "@/app/_library/mongodb";
import User from "@/app/_library/modals/user";

export async function GET(req){
    await connect()

    try {     
        const { _id } = req.query  
        const users = await User.find(_id);         
        return Response.json({ 
            data: users
        })
    } catch (err) {
        return Response.json({ 
            message: err.message
        })          
    }      
}
 
export async function POST(req) {
    // await connect()

    // try {
    //     const { _id } = req.query  
        
    //     //=== for formdata ===
    //     const formData = await req.formData()
    //     const name = formData.get('name')
    //     const email = formData.get('email')
    //     const password = formData.get('password')
    //     const body = { name, email, password }
    //     const newUser = await User.insertOne(body); 
    //     return Response.json({ 
    //         data: newUser
    //     })        
              
    // } catch (err) {
    //     return Response.json({ 
    //         message: err.message
    //     })          
    // }    
}
 
export async function PUT(req) {} 
export async function PATCH(req, { params }) {
    await connect()

    try {
        const { _id } = await params

        console.log('_id:',_id)
        
        //=== for formdata ===
        const formData = await req.formData()
        const name = formData.get('name')
        const email = formData.get('email')
        const phone = formData.get('phone')
        const profile_image = formData.get('profile_image')
        const obj = { name, email, phone, profile_image }

        const updatedUser = await User.findByIdAndUpdate(_id, obj, {new: true})

        return Response.json({ 
            data: updatedUser,
            message: "User Updated successfully",
        },{status: 200})   
              
    } catch (err) {
        return Response.json({ 
            error: err.message
        }, {status: 500})      
    }    
}
export async function DELETE(req) {} 