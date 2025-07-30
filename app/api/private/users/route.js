import { redirect } from 'next/navigation'
import connect from "@/app/_library/mongodb";
import User from "@/app/_library/modals/user";

export async function GET(req){

    await connect()

    try {       
        const users = await User.find();         
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
    await connect()

    try {
        
        //=== for formdata ===
        const formData = await req.formData()
        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')
        const body = { name, email, password }
        const newUser = await User.insertOne(body); 
        return Response.json({ 
            data: newUser
        })
        
        //=== for jsondata ===
        // const body = await req.json();      
        // const newUser = await User.insertOne(body); 
        // return Response.json({ 
        //     data: newUser
        // })
        //redirect('http://localhost:3000/kk')       
    } catch (err) {
        return Response.json({ 
            message: err.message
        })          
    }    
}
 
export async function PUT(request) {} 
export async function DELETE(request) {} 
export async function PATCH(request) {}