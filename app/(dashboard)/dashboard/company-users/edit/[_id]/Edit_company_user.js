"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Image from "next/image";
import {useRouter, useParams} from "next/navigation";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Api from '@/app/_library/Api';
import validation from '@/app/_library/validation';
import SbButton from "@/app/_components/common/SbButton";

import dynamic from 'next/dynamic';
//==== tinymce
const MyEditor = dynamic(() => import('@/app/_components/common/MyEditor'), { ssr: false });
//===

const Edit_company_user = ({ params }) => {

  const { _id } = useParams(params)  

  const __data = {    
    first_name: '',      
    last_name: '',
    email: '',
    phone: '',		
    password: '',	
    status: '',	
  }
  const __errors = {
    first_name: '',      
    last_name: '',
    email: '',
    phone: '',		
    password: '',	
    status: '',	
  }    
  
  const router = useRouter();
  const MySwal = withReactContent(Swal)  
  const formRef = useRef(null);

  const [data, set_data]  = useState(__data)  
  const [disablebutton, set_disablebutton]    = useState(false); 
  const [success_message,set_success_message] = useState("")  
  const [common_error,set_common_error] 		  = useState("")    
  const [errors, set_errors] = useState(__errors) 

  useEffect(()=>{
    fetch_data()
  },[])
  
  
  const fetch_data = async () => {
      try {
          const res = await Api.company_users({
            _id:_id
          }); 
          const resData = res.data          
          set_data(resData.data)
      } catch (error) {
          console.log(error.message)            
      }
  }

  const handleChange = (e)=>{	
    const field_name  = e.target.name;
    const field_value = e.target.value;
    set_data({...data, [field_name]: field_value})
  } 

  const handleEditor = (description)=>{
    set_data({
        ...data, 
        description:description
    })       
  }
  
  const validate_first_name = (value)=>{	
      let err  = '';          
      let first_name = value ?? data.first_name
      if(!first_name){ 
        err  = 'First Name is required';  
      } 
      set_errors({
        ...errors,
        first_name:err
      });	  
      return err;	
  }

  const validate_last_name = (value)=>{	
      let err  = '';          
      let last_name = value ?? data.last_name
      if(!last_name){ 
        err  = 'Last Name is required';  
      } 
      set_errors({
        ...errors,
        last_name:err
      });	  
      return err;	
  }

  const validate_email = (value)=>{	
      let err      = '';  
      let email = value ?? data.email
      if(!email){        
        err  = 'Email is required';         
      }	 
      else if(!validation.validateEmail(email)){       
          err  = 'Email is not valid!';
      }		
      set_errors({
        ...errors,
        email:err
      });	 
      return err;	
    }

    const validate_password = (value)=>{	
      let err     = '';  
      let password  = value ?? data.password
      if(!password){        
        err  = 'Password is required';         
      }	 
      set_errors({
        ...errors,
        password:err
      });	 
      return err;	
    } 

   const validateForm = ()=>{		
      let errors = {};  
      let isValid   = true;  

      let first_name = validate_first_name()
      if( first_name !==''){
          errors.first_name  = first_name;
          isValid = false;
      }    
      
      let last_name = validate_last_name()
      if( last_name !==''){
          errors.last_name  = last_name;
          isValid = false;
      }      

      let email = validate_email()
      if( email !==''){
          errors.email  = email;
          isValid = false;
      }

      // let password = validate_password()
      // if( password !==''){
      //   errors.password  = password;
      //   isValid = false;
      // }

      set_errors(errors);
      return isValid;	
	} 
  
  const handleSubmit = async (e)=>{
      e.preventDefault();   
      if( validateForm() ){
         
          set_disablebutton(true) 

          const formData = new FormData(formRef.current);     
          //formData.append("profile_image", file);
          formData.append("_id", data._id); 
          const res = await Api.update_company_user({              
              formData: formData, 
          });                                
          if( res && (res.status === 200) ){                 
              MySwal.fire({
                  icon: 'success', 
                  text:'Data updated successfully', 
                  confirmButtonColor: '#3085d6'
              }) 
              router.push("/dashboard/company-users");   
          }
          else{          
              const { errors, message } = res.data;  
              set_errors(errors) 
              if(!errors){
                set_common_error(message)
              }
          }
          set_disablebutton(false)    
      }			
  }  
 
  return (
    <> 
    <div className="pagetitle">
        <h1>Edit company user</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link href="/dashboard/company-users">Company users</Link></li>
            <li className="breadcrumb-item active">Edit company user</li>
          </ol>
        </nav>
    </div>

    <section className="section">
      <div className="row"> 
        <div className="col-xl-8">
        <div className="card">
        <div className="card-body pt-3">	
        {common_error &&            
            <div className="alert alert-danger alert-dismissible fade show">
            {common_error} 
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{
                set_common_error('')
            }}>
            <span aria-hidden="true"></span>
            </button>        
            </div> 
        } 
        {success_message &&            
            <div className="alert alert-success alert-dismissible fade show">
            {success_message} 
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{
                set_success_message('')
            }}>
            <span aria-hidden="true"></span>
            </button>        
            </div> 
        }         
        <form name="dataForm" id="dataForm" className="row g-3" method="post" encType="multipart/form-data" 
        onSubmit={handleSubmit}
        ref={formRef}>            

            <div className="col-12">
                <label className="form-label">First Name</label>                    
                <input type="text" className="form-control" id="first_name" name="first_name" 
                value={data.first_name}
                onChange={ (e) => {                    
                    handleChange(e)
                    validate_first_name(e.target.value)
                }} 
                />
                {errors.first_name && 
                    <div className="error-msg">{errors.first_name}</div>    
                } 
            </div>

            <div className="col-12">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" id="last_name" name="last_name"
                value={data.last_name}
                onChange={ (e) => {
                    handleChange(e)
                    validate_last_name(e.target.value)
                }} 
                />
                {errors.last_name && 
                    <div className="error-msg">{errors.last_name}</div>    
                }  
            </div>

            <div className="col-12">
                <label className="form-label">Email</label>
                <input type="text" className="form-control" id="email" name="email"
                value={data.email}
                onChange={ (e) => {
                    handleChange(e)
                    validate_email(e.target.value)
                }} 
                />
                {errors.email && 
                    <div className="error-msg">{errors.email}</div>    
                }  
            </div>

            <div className="col-12">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" id="phone" name="phone"
                value={data.phone}
                onChange={ (e) => {
                    handleChange(e)                    
                }} 
                />
                {errors.phone && 
                    <div className="error-msg">{errors.phone}</div>    
                }  
            </div>


            <div className="col-12">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password"
                //value={data.password}
                onChange={ (e) => {
                    handleChange(e)      
                    //validate_password(e.target.value)
                }} 
                />
                {errors.password && 
                    <div className="error-msg">{errors.password}</div>    
                }  
            </div>

            <div className="col-12">
                <label className="form-label">Status</label>
                <select className="form-select" id="status" name="status"                          
                value={data.status}
                onChange={ (e) => {                    
                    handleChange(e)                            
                }} 
                >
                <option value=""></option>
                <option value="1">Active</option>
                <option value="0">In-Active</option>                        
                </select>                             
                {errors.status && 
                    <div className="error-msg">{errors.status}</div>    
                }  
            </div>   

            <div className="col-12">
                <SbButton data={{
                    type:"submit",
                    text:"Add",
                    class:"btn btn-primary",
                    disabled:disablebutton,
                }} />   
            </div>	
            					
        </form>    
        </div>
        </div>
        </div>         
      </div>
    </section>
    </>
  );
}
export default Edit_company_user
