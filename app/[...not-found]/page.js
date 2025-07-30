import "@/app/globals.css";
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: "Page not found",
  description: "",
};

//=== import images ====
import not_found_img from "@/app/assets/img/not-found.svg";

const Not_found = () =>{
  return (
    <>  
    <div className="container">

      <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>404</h1>
        <h2>The page you are looking for doesn't exist.</h2>
        <Link className="btn" href="/">Back to home <i className="bi bi-arrow-right"></i></Link>
        <Image src={not_found_img} className="img-fluid py-5" style={{maxWidth:"35%"}} alt="Page Not Found" />        
      </section>

    </div>
      
    </>
  );
}
export default Not_found
