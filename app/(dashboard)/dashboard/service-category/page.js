
import Link from 'next/link'
import Image from "next/image";
import Service_categories from "./Service_categories";

export const metadata = {
  title: "Service categories",
  description: "",
};

const Page = () => {
  return (
    <> 
    <Service_categories />
    </>
  );
}
export default Page
