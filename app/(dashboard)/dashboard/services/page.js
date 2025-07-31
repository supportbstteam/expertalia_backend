
import Link from 'next/link'
import Image from "next/image";
import Services from "./Services";

export const metadata = {
  title: "Services",
  description: "",
};

const Page = async ({ searchParams }) => {
  
  const mySearch = await searchParams 

  const __filterData = {  
    page: (mySearch.page) ? mySearch.page :  1,	            
    name: (mySearch.name) ? mySearch.name : '',
    category_name: (mySearch.category_name) ? mySearch.category_name : '',      
    status: (mySearch.status) ? mySearch.status : '',  
	}

  return (
    <> 
    <Services __filterData={__filterData} />
    </>
  );
}
export default Page
