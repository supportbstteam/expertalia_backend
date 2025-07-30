import Image from "next/image";
import Link from 'next/link'
import Login from './Login'

export const metadata = {
  title: "Admin Login",
  description: "",
};

const Page = () => {
  
   return (
    <>    
    <Login />
    </>
  );
}
export default Page
