"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import {useRouter} from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

import logo from "@/app/assets/img/logo.png";
import Api from '@/app/_library/Api';
import validation from '@/app/_library/validation';

const Verifyemail = () => {

    const [token, setToken] = useState("");
    const [success_message,set_success_message] = useState("")  
    const [common_error,set_common_error] 		  = useState("")  

    useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
    }, []);

    useEffect(() => {
      if(token.length > 0){
        verifyUserEmail();
      }
    }, [token]);

    const verifyUserEmail = async () => {
         try {          
            const res = await Api.verifyemail({
              token:token,
            }); 

            if( res && (res.status === 200) ){  
              set_success_message('Email Verified successfully'); 
            } 
            else{
              set_common_error('Invalid token');
            } 
        } 
        catch (err) {
          set_common_error('Invalid token');
        }        
    };

   return (
    <>  

    <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">                
                      <Image src={logo} className="logo" alt="" />  
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">

                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Verify Email</h5>                        
                        <p className="text-center small">
                        Token : {token ? `${token}` : "no token"}
                        </p>
                      </div>
    
                      {common_error &&            
                          <div className="alert alert-danger text-center fade show">
                            {common_error}                             
                          </div> 
                      } 
                      {success_message &&   
                         <>    
                          <div className="alert alert-success text-center fade show">
                            {success_message}                             
                          </div> 
                          <Link href="/">Login</Link>
                          </>     
                      } 
                     
    
                    </div>
                  </div>
                 
    
                </div>
              </div>
            </div>
          </section>
        </div>      
    </>
  );
}
export default Verifyemail
