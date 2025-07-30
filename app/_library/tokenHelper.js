
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'

const tokenHelper = {   
  
  getDataFromToken : async (token_name)=>{
    try {        
        const cookieStore = await cookies()
        const token = cookieStore.get(token_name) || '' 
        var user_id = ''
        jwt.verify(token['value'], process.env.TOKEN_SECRET, function(err, decoded) {
          if (err){
            console.log('ERROR', err)
          }          
          user_id = decoded.id;
        });
        return user_id;

    } catch(error){
        throw new Error(error.message)        
    }
  },  
  isTokenExpired : async (token)=>{
    // past date token example : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
    try {
      const arrayToken = token.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.exp;     
      //return tokenPayload;   
    }  
    catch(err){
      return true;   
    }
  },

}
export default tokenHelper;