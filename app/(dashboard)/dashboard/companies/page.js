
import Link from 'next/link'
import Image from "next/image";
import Companies from "./Companies";

export const metadata = {
  title: "Companies",
  description: "",
};

const Page = async ({ searchParams }) => {
  
  const mySearch = await searchParams 

  const __filterData = {  
    page: (mySearch.page) ? mySearch.page :  1,	            
    name: (mySearch.name) ? mySearch.name : '',
    email: (mySearch.email) ? mySearch.email : '',  
    zipcode: (mySearch.zipcode) ? mySearch.zipcode : '',  
    status: (mySearch.status) ? mySearch.status : '',  
	}

  return (
    <> 
    <Companies __filterData={__filterData}  />
    </>
  );
}
export default Page
