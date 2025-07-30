/** @type {import('next').NextConfig} */
const nextConfig = {  
  reactStrictMode: true,  
  images:{     
    domains : [
      "images.pexels.com",
      "google.com",
      "localhost"
    ]
  },
  env:{    
    APP_PREFIX: process.env.APP_PREFIX,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    APP_URL: process.env.APP_URL,   
    FILE_UPLOAD_PATH: process.env.FILE_UPLOAD_PATH,
    FILE_UPLOAD_URL: process.env.FILE_UPLOAD_URL,
    API_URL: process.env.API_URL,   
    MONGODB_DBNAME: process.env.MONGODB_DBNAME,
    MONGODB_URI: process.env.MONGODB_URI,
    RECAPTCHAV3_SITEKEY: process.env.RECAPTCHAV3_SITEKEY,
    RECAPTCHAV3_SECRET: process.env.RECAPTCHAV3_SECRET, 
    MAIL_MAILER: process.env.MAIL_MAILER,    
    MAIL_HOST: process.env.MAIL_HOST,    
    MAIL_PORT: process.env.MAIL_PORT,    
    MAIL_USERNAME: process.env.MAIL_USERNAME,    
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,    
    MAIL_ENCRYPTION: process.env.MAIL_ENCRYPTION,    
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,    
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,  
  },
  devIndicators: false && {
    position  :  'bottom-left',  // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
  }, 
  eslint: {
    ignoreDuringBuilds: true, // for ignore build error validation
  }, 
  //=== add this for cors header ===
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",  
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  
};

export default nextConfig;
