
import Link from 'next/link'
import Image from "next/image";
import Company_users from "./Company_users";

export const metadata = {
  title: "Companies",
  description: "",
};

const Page = async ({ searchParams }) => {

  const mySearch = await searchParams 

  const __filterData = {  
    page: (mySearch.page) ? mySearch.page :  1,	            
    first_name: (mySearch.first_name) ? mySearch.first_name : '',
    last_name: (mySearch.last_name) ? mySearch.last_name : '',  
    email: (mySearch.email) ? mySearch.email : '',  
    phone: (mySearch.phone) ? mySearch.phone : '',  
    status: (mySearch.status) ? mySearch.status : '',  
	}

  return (
    <> 
    <Company_users __filterData={__filterData} />
    </>
  );
}
export default Page
