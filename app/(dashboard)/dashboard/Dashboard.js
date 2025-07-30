"use client"
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link'
import Image from "next/image";
import styles from "./page.module.css";
import Api from '@/app/_library/Api';

const Dashboard = (props) => { // {pageData, anotherData}
 
  const [data, set_data]  = useState("") 

  useEffect(()=>{
      fetch_data()           
  },[])    

  const fetch_data = async () => {
      try {
          const res = await Api.me(); 
          const resData = res.data
          set_data(resData.data)
      } catch (error) {
          console.log(error.message)            
      }
  }

  return (
    <> 
    <div className="pagetitle">
      <h1>Dashboard</h1>      
    </div>

    <section className="section">
      <div className="row">
        <div className="col-lg-6">

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Example Card</h5>              
              <p>This is an examle page with no contrnt. You can use it as a starter for your custom pages.</p>
            </div>
          </div>

        </div>

        <div className="col-lg-6">

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Example Card</h5>
              <p>This is an examle page with no contrnt. You can use it as a starter for your custom pages.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
export default Dashboard
