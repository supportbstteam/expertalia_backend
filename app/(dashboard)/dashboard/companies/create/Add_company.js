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

const Add_company = () => {

  const __data = {    
    user:'',
    name: '',      
    nif: '',
    zipcode: '',
    address: '',		
    description: '',
    services:[],	
    status: '',	
  }
  const __errors = {
    user:'',
    name: '',      
    nif: '',
    zipcode: '',
    address: '',		
    description: '',	
    services:'',
    status: '',	
  }    
  
  const router = useRouter();
  const MySwal = withReactContent(Swal)  
  const formRef = useRef(null);
  const maxService = 3

  const [data, set_data]  = useState(__data)  
  const [company_users, set_company_users]  = useState([])  
  const [services, set_services]  = useState([]) 
  const [disablebutton, set_disablebutton]    = useState(false); 
  const [success_message,set_success_message] = useState("")  
  const [common_error,set_common_error] 		  = useState("")    
  const [errors, set_errors] = useState(__errors)  


  useEffect(()=>{
    fetch_company_users()
  },[]) 
  
  const fetch_company_users = async () => {
      try {
          const res = await Api.company_users_list({
            search_text:''
          }); 
          const resData = res.data  
          set_company_users(resData.data)
      } catch (error) {
          console.log(error.message)            
      }
  }   
  useEffect(()=>{
      fetch_services()
  },[]) 
    
  const fetch_services = async () => {
      try {
          const res = await Api.service_list({
            search_text:''
          }); 
          const resData = res.data              
          set_services(resData.data)
      } catch (error) {
          console.log(error.message)            
      }
  }    
   
  
  const handleChange = (e)=>{	
    const field_name  = e.target.name;
    const field_value = e.target.value;
    set_data({...data, [field_name]: field_value})
  }  

  const handleServiceChange = (e, val)=>{	    
    let servArr = data.services
    let checked = (e.target.checked) ? true : false
    const foundService = servArr.find(item => item._id === val._id);  

    if( servArr.length < 3 && checked==true && !foundService ){
      servArr.push(val)
    } 
    else if( checked==false && foundService ){
      servArr = servArr.filter(item => item._id !== val._id);
    }     
    set_data({
      ...data, 
      services: servArr
    })    
  
  } 

  const delete_service = (val)=>{	
    let servArr = data.services    
    servArr = servArr.filter(item => item._id !== val._id); 
    set_data({
      ...data, 
      services: servArr
    })
  }   

  const handleEditor = (description)=>{
    set_data({
        ...data, 
        description:description
    })       
  }

   const validate_user = (value)=>{	
      let err  = '';          
      let user = value ?? data.user
      if(!user){ 
        err  = 'Company User is required';  
      } 
      set_errors({
        ...errors,
        user:err
      });	  
      return err;	
  }
  
  const validate_name = (value)=>{	
      let err  = '';          
      let name = value ?? data.name
      if(!name){ 
        err  = 'Company Name is required';  
      } 
      set_errors({
        ...errors,
        name:err
      });	  
      return err;	
  }

  const validate_nif = (value)=>{	
      let err      = '';  
      let nif = value ?? data.nif
      if(!nif){        
        err  = 'NIF is required';         
      }	
      set_errors({
        ...errors,
        nif:err
      });	 
      return err;	
    }

    const validate_zipcode = (value)=>{	
      let err  = '';          
      let zipcode = value ?? data.zipcode
      if(!zipcode){ 
        err  = 'Zip code is required';  
      } 
      set_errors({
        ...errors,
        zipcode:err
      });	  
      return err;	
  }

   const validateForm = ()=>{		
      let error     = {};  
      let isValid   = true;        

      let user = validate_user()
      if( user !==''){
          error.user  = user;
          isValid = false;
      }     

      let name = validate_name()
      if( name !==''){
          error.name  = name;
          isValid = false;
      }      

      let nif = validate_nif()
      if( nif !==''){
          error.nif  = nif;
          isValid = false;
      }

      let zipcode = validate_zipcode()
      if( zipcode !==''){
          error.zipcode  = zipcode;
          isValid = false;
      }

      set_errors(error);
      return isValid;	
	} 
  
  const handleSubmit = async (e)=>{
      e.preventDefault();   
      if( validateForm() ){
         
          set_disablebutton(true) 

          let servArr = []
          data.services.map((val,i)=>{
            servArr.push(val._id)
          })

          const formData = new FormData(formRef.current);     
          //formData.append("company_logo", file);
          formData.append("services", JSON.stringify(servArr));        
          formData.append("description", data.description);
          const res = await Api.create_company({              
              formData: formData, 
          });                                
          if( res && (res.status === 200) ){                 
              MySwal.fire({
                  icon: 'success', 
                  text:'Data inserted successfully', 
                  confirmButtonColor: '#3085d6'
              }) 
              router.push("/dashboard/companies");   
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
        <h1>Add company</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link href="/dashboard/companies">Companies</Link></li>
            <li className="breadcrumb-item active">Add company</li>
          </ol>
        </nav>
    </div>

    <section className="section">
      <form name="dataForm" id="dataForm" method="post" encType="multipart/form-data" 
      onSubmit={handleSubmit}
      ref={formRef}>

      <div className="row"> 
        <div className="col-xl-6">
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

            <div className="row g-3">
              <div className="col-12">
                  <label className="form-label">Company User</label>
                  <select className="form-select" id="user" name="user"                          
                  value={data.user}
                  onChange={ (e) => {                    
                      handleChange(e)        
                      validate_user(e.target.value)                     
                  }} 
                  >
                  <option value="">--select--</option>
                  {
                    company_users.map((val,i)=>{
                      return(
                        <option key={i} value={ val._id }>{ val.first_name + ' '+ val.last_name + ' (' + val.email + ')' }</option>
                      )
                    })
                  }
                  </select>                             
                  {errors.user && 
                      <div className="error-msg">{errors.user}</div>    
                  }  
              </div>   


              <div className="col-12">
                  <label className="form-label">Company Name</label>                    
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
                  <label className="form-label">NIF</label>
                  <input type="text" className="form-control" id="nif" name="nif"
                  value={data.nif}
                  onChange={ (e) => {
                      handleChange(e)
                      validate_nif(e.target.value)
                  }} 
                  />
                  {errors.nif && 
                      <div className="error-msg">{errors.nif}</div>    
                  }  
              </div>

              <div className="col-12">
                  <label className="form-label">Zip code</label>
                  <input type="text" className="form-control" id="zipcode" name="zipcode"
                  value={data.zipcode}
                  onChange={ (e) => {
                      handleChange(e)
                      validate_zipcode(e.target.value)
                  }} 
                  />
                  {errors.zipcode && 
                      <div className="error-msg">{errors.zipcode}</div>    
                  }  
              </div>

              <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" id="address" name="address" rows={2}
                  value={data.address}
                  onChange={ (e) => {
                      handleChange(e)                    
                  }} 
                  />
                  {errors.address && 
                      <div className="error-msg">{errors.address}</div>    
                  }  
              </div>              


              <div className="col-12">
                  <label className="form-label">Description</label>  
                  <MyEditor data={{
                      content:data.description,
                      handleEditor:handleEditor						
                  }}                    
                  />
                  {errors.description && 
                      <div className="error-msg">{errors.description}</div>    
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
            </div>					
        
        </div>
        </div>
        </div>   

        <div className="col-xl-6">
          <div className="card">
            <div className="card-body pt-3">
              <div className="row g-3">
                
                {/** services section [start]  */}
                <div className="col-12">  
                  <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordion-01" aria-expanded="false" aria-controls="accordion-01">
                        Representative sectors (maximum 3)
                        </button>
                      </h2>
                      <div id="accordion-01" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body myScrollBar">                        
                        {
                          services && services.map((val,i)=>{

                            let catData = val.category
                            let serviceData = val.services

                            return(                              
                              <div key={i} className="col-12 mb-3">
                              <label className="form-label"><b>{catData.name}</b></label>
                              {
                                serviceData.map((val2,j)=>{
                                    
                                  const foundService = data.services.find(item => item._id === val2._id);                               
                                  let checked = (foundService) ? true : false  

                                  return(
                                    <div key={j} className="form-check">
                                      <input className="form-check-input" type="checkbox"                                       
                                      value={val2} 
                                      checked={checked} 
                                      onChange={(e)=>{
                                        handleServiceChange(e,val2)
                                      }} 
                                      />
                                      <label className="form-check-label">
                                      {val2.name}
                                      </label>
                                    </div>
                                  )
                                })
                              }
                              </div>                             
                            )

                          })
                        }                         
                        </div>
                      </div>
                    </div>                    

                  </div>   
                  {
                  data?.services &&
                  <ol className="list-group">
                  {
                    data?.services.map((val,i)=>{
                      return(
                        <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
                          <div className="ms-2 me-auto">
                          {/* <div className="fw-bold">Subheading</div> */}
                          { val.name }
                          </div>                          
                          <i className="bi bi-trash text-danger" style={{cursor:"pointer"}}
                          onClick={()=>{
                            delete_service(val)
                          }}
                          ></i>
                        </li>
                      )
                    })
                  }
                  </ol>
                  }
                </div>  
                {/** services section [ends]  */}  
            </div>           
            </div>    
          </div>
        </div>  

      </div>
      </form>
    </section>
    </>
  );
}
export default Add_company
