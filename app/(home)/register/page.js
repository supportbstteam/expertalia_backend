import Image from "next/image";
import Link from 'next/link'
import Register from './Register'

export const metadata = {
  title: "Admin Register",
  description: "",
};

const Page = () => {

   return (
    <>    
    <Register />
    </>
  );
}
export default Page
