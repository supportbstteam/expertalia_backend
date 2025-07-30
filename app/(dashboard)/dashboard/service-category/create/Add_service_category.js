"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Image from "next/image";
import {useRouter} from "next/navigation";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Api from '@/app/_library/Api';
import validation from '@/app/_library/validation';
import SbButton from "@/app/_components/common/SbButton";

import dynamic from 'next/dynamic';
//==== tinymce
const MyEditor = dynamic(() => import('@/app/_components/common/MyEditor'), { ssr: false });
//===

const Add_service_category = () => {

  const __data = {    
    name: '',  
    status: '',	
  }
  const __errors = {
    name: '',  
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
  
  const validate_name = (value)=>{	
      let err  = '';          
      let name = value ?? data.name
      if(!name){ 
        err  = 'Category Name is required';  
      } 
      set_errors({
        ...errors,
        name:err
      });	  
      return err;	
  }

   const validateForm = ()=>{		
      let errors     = {};  
      let isValid   = true;  

      let name = validate_name()
      if( name !==''){
          errors.name  = name;
          isValid = false;
      }       
      
      set_errors(errors);
      return isValid;	
	} 
  
  const handleSubmit = async (e)=>{
      e.preventDefault();   
      if( validateForm() ){
         
          set_disablebutton(true) 

          const formData = new FormData(formRef.current);     
          //formData.append("service_category_image", file);          
          const res = await Api.create_service_category({              
              formData: formData, 
          });                                
          if( res && (res.status === 200) ){                 
              MySwal.fire({
                  icon: 'success', 
                  text:'Data inserted successfully', 
                  confirmButtonColor: '#3085d6'
              }) 
              router.push("/dashboard/service-category");   
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
        <h1>Add service category</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link href="/dashboard/service-category">Service categories</Link></li>
            <li className="breadcrumb-item active">Add service category</li>
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
                <label className="form-label">Category Name</label>                    
                <input type="text" className="form-control" id="name" name="name" 
                value={data.name}
                onChange={ (e) => {                    
                    handleChange(e)
                    validate_name(e.target.value)
                }} 
                />
                {errors.name && 
                    <div className="error-msg">{errors.name}</div>    
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
export default Add_service_category
