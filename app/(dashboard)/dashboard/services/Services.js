"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation'

import Link from 'next/link'
import Image from "next/image";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Api from '@/app/_library/Api';
import AllFunctionClient from '@/app/_library/AllFunctionClient';
import Pagination from '@/app/_components/common/pagination/Pagination';

const Services = ({__filterData}) => {

  const router = useRouter()
  const pathname = usePathname()

  const item_per_page = AllFunctionClient.limit()

  const MySwal = withReactContent(Swal)  
  
  const [total, set_total] = useState(0)   
  const [data, set_data]   = useState([])
  const [filterData, set_filterData] = useState(__filterData)    

  useEffect(() => {       
      fetchData(__filterData.page)  
  },[]);  

  useEffect(() => {       
      updateBrowserUrl(__filterData.page)  
  },[]);  

  const fetchData = async (pageNo) => {     
    const res = await Api.services({
        page: (pageNo) ? pageNo : filterData.page,    
        name: filterData.name,    
        category_name: filterData.category_name, 
        status: filterData.status,       
    }); 
    const resData = res.data  
    set_total(resData.total)
    set_data(resData.data)     
    updateBrowserUrl(pageNo)  
  }

  const handleChange = (e)=>{	
		const field_name  = e.target.name;
		const field_value = e.target.value;
		set_filterData({...filterData, [field_name]: field_value})
	}

  const handlePaginate = (pageNo)=>{
    set_filterData({
      ...filterData, 
      'page':pageNo
    })
    fetchData(pageNo); 
    updateBrowserUrl(pageNo)		
  }

  const updateBrowserUrl = (pageNo)=>{	
    let string = ''    
    var count = 0   
    filterData['page'] = pageNo
    Object.entries(filterData).forEach(([key, value]) => {      
      if(value!=''){
          count++
          if(count == 1){
              string += key + '=' +  value    
          }
          else{
              string += '&' + key + '=' +  value
          }      
      } 
    });
		router.push(pathname + (string) ? '?' + string : '')  		
	}

  const deleteRow = (_id)=>{
      MySwal.fire({
          title: 'Are you sure?',  
          text: 'You want to delete selected item',                 
          showCancelButton: true,                 
          cancelButtonText: 'No',
          cancelButtonColor: '#3085d6',  
          confirmButtonText: 'Yes', 
          confirmButtonColor: '#d33'
      }).then( async (result) => {
          
          if(result.isConfirmed){ 
              const res = await Api.delete_service({
                  _id: _id,  
              });             
              if( res && (res.status === 200) ){    
                  fetchData(1); 		              
                  MySwal.fire({
                      icon: 'success', 
                      text:'item deleted succsessfully', 
                      confirmButtonColor: '#3085d6'
                  })  
              }              
          }
            
      })
  }

  let page_number  = __filterData.page 
  let total_page   = Math.ceil(total/item_per_page);  
  let start_text   = (total) ? ((page_number - 1) * item_per_page) + 1 : 0;
  let end_text     = (((page_number - 1) * item_per_page) > (total - item_per_page)) ? total : (((page_number - 1) * item_per_page) + item_per_page);
  let display_text = `Showing ${start_text} to ${end_text}  of <strong>${total}</strong> results`;
  let sl_no        = (total) ? ((page_number - 1) * item_per_page) + 0 : 0;

  return (
    <> 
    <div className="pagetitle">
        <h1>Services</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item active">Services</li>
          </ol>
        </nav>
    </div>

    <section className="section">
      <div className="row">   
        <div className="col-12">   

            <div className="card filter-box">
              <div className="card-body"> 
                    <div className="row">

                        <div className="col-lg-3 col-md-6 col-12">
                        <div className="mb-2">
                        <input type="text" className="form-control" id="name" name="name" placeholder="Name" 
                        value={filterData.name}
                        onChange={ (e) => {                    
                            handleChange(e)                            
                        }} 
                        />                                
                        </div>  
                        </div>  
                        
                        <div className="col-lg-3 col-md-6 col-12">
                        <div className="mb-2">
                        <input type="text" className="form-control" id="category_name" name="category_name" placeholder="Category"                         
                        value={filterData.category_name}
                        onChange={ (e) => {                    
                            handleChange(e)                            
                        }} 
                        />                                
                        </div>  
                        </div>  
                        
                        <div className="col-lg-3 col-md-6 col-12">
                        <div className="mb-2">
                        <select className="form-select" id="status" name="status"                          
                        value={filterData.status}
                        onChange={ (e) => {                    
                            handleChange(e)                            
                        }} 
                        >
                        <option value="">Status</option>
                        <option value="1">Active</option>
                        <option value="0">In-Active</option>                        
                        </select>                             
                        </div>  
                        </div>                                       

                        <div className="col-lg-3 col-md-6 col-12">
                        <div className="mb-2">
                            <button type="button" className="btn btn-sm w-50 btn-secondary" onClick={()=>{
                              fetchData(1)
                            }}>Filter
                            </button>                                 
                        </div>
                        </div>
                    </div>                       
              </div>
            </div>         

            <div className="text-end my-2">
              <Link className="btn btn-sm btn-primary" href="/dashboard/services/create">+ Add New</Link>
            </div>
            <div className="card">
              <div className="card-body table-card-body">  

                <div className="table-responsive">                          
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr className="table-thead">
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>                       
                        <th>Status</th>
                        <th className="text-center" style={{width:"15%"}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data && data.length > 0 ?
                        data.map((val,i)=>{
                          sl_no++
                          return(
                            <tr key={i}>
                              <th>{ sl_no }</th>
                              <td>{ val.name }</td>
                              <td>{ val?.category?.name }</td>                             
                              <td>
                                { 
                                  val.status == 1 ?
                                  <span className="badge bg-success">Active</span>
                                  :
                                  <span className="badge bg-danger">In-Active</span>
                                }

                              </td> 
                              <td className="text-center">
                                <Link href={`/dashboard/services/edit/${val._id}`} className="btn btn-md" title="Edit">
                                  <i className="bi bi-pencil-square text-success"></i>
                                </Link> 
                                |
                                <button type="button" className="btn btn-md" title="Delete" onClick={ ()=>deleteRow(val._id) }>
                                  <i className="bi bi-trash text-danger"></i>
                                </button>    

                              </td>
                            </tr> 
                          )
                        })
                        
                        :

                        <tr>
                          <td colSpan={5}>No record found.</td>                          
                        </tr> 
                      }
                    </tbody>
                  </table>
                </div>
                
                <div className="row">
                    <div className="col-md-12">
                    {total_page > 1 && 
                      <div className="card-body table-responsive">
                      <Pagination data={{
                      'total'			    :total,
                      'item_per_page'	:item_per_page,
                      'page_number'	  :page_number,
                      'handlePaginate':handlePaginate						
                      }} />
                      </div>
                    }	
                    </div>                    
                </div>

              </div>
            </div>
        </div>
      </div>
    </section>
    </>
  );
}
export default Services
