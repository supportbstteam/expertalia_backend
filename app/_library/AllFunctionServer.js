
import dayjs from 'dayjs'
import jwt from "jsonwebtoken"

import path from 'path';
const fs = require('fs');
const sharp = require('sharp');

const AllFunctionServer = {   

  shortName : (text)=> {
    let letter = ''
    const myArray = text.split(" ");
    myArray.forEach(function (item, index) {
      letter += item[0].toUpperCase()      
    });
    return letter;
  },
  limit : ()=> {    
    return 10;
  },
  generateRandomNumber : (length)=>{
    var randomValues = '';
    var stringValues = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';  
    var sizeOfCharacter = stringValues.length;  
    for (var i = 0; i < length; i++) {
      randomValues = randomValues+stringValues.charAt(Math.floor(Math.random() * sizeOfCharacter));
    }
    return randomValues;
  }, 
  formatDate: (isoDateStr)=> {
    const date = new Date(isoDateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  objToQuerystring : (obj)=> {
    const keyValuePairs = [];
    for (let i = 0; i < Object.keys(obj).length; i += 1) {
      keyValuePairs.push(`${encodeURIComponent(Object.keys(obj)[i])}=${encodeURIComponent(Object.values(obj)[i])}`);
    }
    return keyValuePairs.join('&');
  },
  getFormattedDate: (myDateTime)=> {    
    return dayjs(myDateTime).format('MM-DD-YYYY, hh:mm A');
  },
  getHourMinute: (myDateTime)=> {    
    return dayjs(myDateTime).format('hh:mm');
  },
  getDateTime: (myDateTime)=> {    
    return dayjs(myDateTime).format('YYYY-MM-DD hh:mm:ss');
  },
  currency: (amount)=>{
    return '$'+amount;
  },
  get_localTime : (obj)=> {
    let localTime = new Date(new Date().toLocaleString("en-US", {timeZone: "CAT"}));
    return localTime
  },
  checkAxiosError : (err)=> { 
    if(err && err.response.statusText==='Unauthorized'){
      localStorage.removeItem('electron_authToken');	
      localStorage.removeItem('electron_user_id');         
    }     
  },  
  range :(start, end)=>{
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
  },
  upload_image : async (obj)=>{
    
      const file = obj.file
      const folder_name = obj.folder_name
      const width = obj.width
      const height = obj.height  
      
      const byteData = await file.arrayBuffer()
      const buffer   = Buffer.from(byteData)
      const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const dir      = `${process.env.FILE_UPLOAD_PATH}/${folder_name}`         
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);                
      }
      const outputPath = `${dir}/${filename}`  

      await sharp(buffer)
      .resize(width, height, { fit: 'inside' }) // Resize to max 800x600, maintaining aspect ratio
      .toFile(outputPath);

      return filename

    },
    upload_file : async (obj)=>{
    
      const file = obj.file
      const folder_name = obj.folder_name      
      
      const byteData = await file.arrayBuffer()
      const buffer   = Buffer.from(byteData)
      const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const dir      = `${process.env.FILE_UPLOAD_PATH}/${folder_name}`         
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);                
      }
      const outputPath = `${dir}/${filename}`                       
      writeFile(outputPath,buffer) 

      return filename
    },
    delete_file : async (obj)=>{
    
      const filename    = obj.filename
      const folder_name = obj.folder_name  
      const dir         = `${process.env.FILE_UPLOAD_PATH}/${folder_name}`         
      const filePath    = `${dir}/${filename}`  
      
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully!');
        }
      });
      
      return ''
    }
      
}
export default AllFunctionServer;