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

const Add_cms_page = () => {

  const __data = {    
    name: '',      
    slug: '',
    content: '',		
    meta_title: '',			
    meta_keyword: '',			
    meta_description: '',			
    status: '',	
  }
  const __errors = {
    name: '',      
    slug: '',
    content: '',		
    meta_title: '',			
    meta_keyword: '',			
    meta_description: '',			
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
  
  const handleNameAndSlug = (e)=>{   
    const field_name  = e.target.name;
	const field_value = e.target.value;
    const text = field_value.trim().toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
	set_data({
        ...data, 
        [field_name]: field_value,
        slug:text
    })

  }  

  const handleEditor = (content)=>{
    set_data({
        ...data, 
        content:content
    })       
  }
  
  const validate_name = (value)=>{	
      let err  = '';          
      let name = value ?? data.name
      if(!name){ 
        err  = 'Name is required';  
      } 
      set_errors({
        ...errors,
        name:err
      });	  
      return err;	
  }

  const validate_slug = (value)=>{	
      let err  = '';          
      let slug = value ?? data.slug
      if(!slug){ 
        err  = 'Slug is required';  
      } 
      set_errors({
        ...errors,
        slug:err
      });	  
      return err;	
  }

   const validateForm = ()=>{		
      let error     = {};  
      let isValid   = true;  

      let name = validate_name()
      if( name !==''){
          error.name  = name;
          isValid = false;
      }      

      let slug = validate_slug()
      if( slug !==''){
          error.slug  = slug;
          isValid = false;
      }
      set_errors(error);
      return isValid;	
	} 
  
  const handleSubmit = async (e)=>{
      e.preventDefault();   
      if( validateForm() ){
         
          set_disablebutton(true) 

          const formData = new FormData(formRef.current);     
          //formData.append("banner_image", file);
          formData.append("content", data.content);
          const res = await Api.create_page({              
              formData: formData, 
          });                                
          if( res && (res.status === 200) ){                 
              MySwal.fire({
                  icon: 'success', 
                  text:'Data inserted successfully', 
                  confirmButtonColor: '#3085d6'
              }) 
              router.push("/dashboard/pages");   
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
        <h1>Add page</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link href="/dashboard/pages">Pages</Link></li>
            <li className="breadcrumb-item active">Add page</li>
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
                <label className="form-label">Name</label>                    
                <input type="text" className="form-control" id="name" name="name" 
                value={data.name}
                onChange={ (e) => {                    
                    handleNameAndSlug(e)
                    validate_name(e.target.value)
                }} 
                />
                {errors.name && 
                    <div className="error-msg">{errors.name}</div>    
                } 
            </div>

            <div className="col-12">
                <label className="form-label">Slug</label>
                <input type="text" className="form-control" id="slug" name="slug"
                value={data.slug}
                onChange={ (e) => {
                    handleChange(e)
                    validate_slug(e.target.value)
                }} 
                />
                {errors.slug && 
                    <div className="error-msg">{errors.slug}</div>    
                }  
            </div>


            <div className="col-12">
                <label className="form-label">Content</label>  
                <MyEditor data={{
                    content:data.content,
                    handleEditor:handleEditor						
                }}                    
                />
                {errors.content && 
                    <div className="error-msg">{errors.content}</div>    
                } 
            </div>

            <div className="col-12">
                <label className="form-label">Meta title</label>
                <textarea className="form-control" id="meta_title" name="meta_title" rows={5}
                value={data.meta_title}
                onChange={ (e) => {
                    handleChange(e)                    
                }} 
                />
                {errors.meta_title && 
                    <div className="error-msg">{errors.meta_title}</div>    
                }  
            </div>              

            <div className="col-12">
                <label className="form-label">Meta keyword</label>
                <textarea className="form-control" id="meta_keyword" name="meta_keyword" rows={5}
                value={data.meta_keyword}
                onChange={ (e) => {
                    handleChange(e)                    
                }} 
                />
                {errors.meta_keyword && 
                    <div className="error-msg">{errors.meta_keyword}</div>    
                }  
            </div> 
            

            <div className="col-12">
                <label className="form-label">Meta description</label>
                <textarea className="form-control" id="meta_description" name="meta_description" rows={5}
                value={data.meta_description}
                onChange={ (e) => {
                    handleChange(e)                    
                }} 
                />
                {errors.meta_description && 
                    <div className="error-msg">{errors.meta_description}</div>    
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
export default Add_cms_page
