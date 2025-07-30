import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import tokenHelper from '@/app/_library/tokenHelper';

export async function middleware(request){  

  const cookieStore = await cookies()
  let token = cookieStore.get('token') ?? '' 
      token = token['value'] ?? ''

  const path = request.nextUrl.pathname  

  let header_token = request.headers.get("authorization") ?? ''
      header_token = header_token.replace("Bearer", "");   
      header_token = header_token.trim()    
      
  const publicPathArray = [
        '/',
        '/register',
        '/verifyemail',
        '/forgot-password',
        '/reset-password',        
  ]

  var isPublicPath = false
  if(publicPathArray.includes(path)){
    isPublicPath = true
  }  
  
  //== redirect to dashboard === 
  if(isPublicPath && token){ 
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  //#########
  //  logic for user dashboard middleware
  //#########
  if(request.nextUrl.pathname.startsWith('/dashboard')){
      
      //== redirect to login === 
      if(!isPublicPath && !token){   
        return NextResponse.redirect(new URL('/', request.url));
      }
  }  


  //#########
  //  logic for admin api middleware
  //#########
  if(request.nextUrl.pathname.startsWith('/api/private')){  

      let isTokenExpired = await tokenHelper.isTokenExpired(header_token)  

      if( !header_token ){
          return NextResponse.json({             
            message: 'Authentication credentials were not provided'
          },{status: 400})  
      }  
      if(  token != header_token || isTokenExpired === true ){ 
          return NextResponse.json({ 
            //isTokenExpired:isTokenExpired,
            //token:token,
            //header_token:header_token,
            message: 'Not authenticated. Token is either invalid or expired'
          },{status: 400})  
      }
  }
  

}

// It specifies the paths for which this middleware should be executed. 
export const config = {
  matcher: [
    '/:path*',  
    '/dashboard/:path*',      
    '/api/private/:path*',   
  ]
}