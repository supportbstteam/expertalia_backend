
import Link from 'next/link'
import Image from "next/image";
import Cms_pages from "./Cms_pages";

export const metadata = {
  title: "Pages",
  description: "",
};

const Page = () => {
  return (
    <> 
    <Cms_pages />
    </>
  );
}
export default Page
