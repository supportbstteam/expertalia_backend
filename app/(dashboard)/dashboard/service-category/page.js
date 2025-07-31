
import Link from 'next/link'
import Image from "next/image";
import Service_categories from "./Service_categories";

export const metadata = {
  title: "Service categories",
  description: "",
};

const Page = async ({ searchParams }) => {
  
  const mySearch = await searchParams 

  const __filterData = {  
    page: (mySearch.page) ? mySearch.page :  1,	            
    name: (mySearch.name) ? mySearch.name : '',    
    status: (mySearch.status) ? mySearch.status : '',  
	}

  return (
    <> 
    <Service_categories __filterData={__filterData} />
    </>
  );
}
export default Page
