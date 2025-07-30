import Link from 'next/link'
import Image from "next/image";
import styles from "./page.module.css";

import Dashboard from "./Dashboard";
import connect from "@/app/_library/mongodb";
import Cmspage from "@/app/_library/modals/cmspage";

export const metadata = {
  title: "Dashboard",
  description: "",
};

const Page = async ({ params, searchParams }) => {

  await connect()  
  
  return (
    <> 
    <Dashboard />
    </>
  );
}
export default Page
