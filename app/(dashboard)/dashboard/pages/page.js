
import Link from 'next/link'
import Image from "next/image";
import Cms_pages from "./Cms_pages";

export const metadata = {
  title: "Pages",
  description: "",
};

const Page = async ({ searchParams }) => {

  const mySearch = await searchParams 

  const __filterData = {  
    page: (mySearch.page) ? mySearch.page :  1,	            
    name: (mySearch.name) ? mySearch.name : '',
    slug: (mySearch.slug) ? mySearch.slug : '',  
    status: (mySearch.status) ? mySearch.status : '',  
	}

  return (
    <> 
    <Cms_pages __filterData={__filterData} />
    </>
  );
}
export default Page
