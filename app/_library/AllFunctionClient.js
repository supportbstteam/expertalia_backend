
import dayjs from 'dayjs'

const AllFunctionClient = {   

  shortName : (text)=> {
    text = `${text}`
    let letter = ''
    const myArray = text.split(" ");
    myArray.forEach(function (item, index) {
      let firstLetter = item[0] ?? ''
      if(firstLetter){
        letter += firstLetter.toUpperCase()      
      }
      
    });
    return text;
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
    return dayjs(myDateTime).format('D MMM, YYYY h:mm A'); // D MMM, YYYY h:mm A // MM-DD-YYYY, hh:mm A
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

}
export default AllFunctionClient;