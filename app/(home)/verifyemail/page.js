import Image from "next/image";
import Link from 'next/link'
import Verifyemail from './Verifyemail'

export const metadata = {
  title: "Admin Verify email",
  description: "",
};

const Page = () => {

   return (
    <>    
    <Verifyemail />
    </>
  );
}
export default Page
