"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import {useRouter} from "next/navigation";
import Api from '@/app/_library/Api';
import AllFunctionClient from '@/app/_library/AllFunctionClient';
import Image from 'next/image'

//=== import images ====
import profile_default_img from "@/app/assets/img/default-profile.png";

import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '@/app/_library/redux/slice/userReducer'

const Profile_top = ()=>{

    const router       = useRouter();

    const dispatch     = useDispatch()
    const userState    = useSelector( (state)=> state.user )  
    const user         = (userState.data) ? userState.data : {};

    useEffect(() => {
        dispatch(fetchUser())        
	},[]); 
   
    const logout = async () => {
        try {
            const res = await Api.logout(); 
            localStorage.removeItem(process.env.APP_PREFIX + 'access_token');
            dispatch(fetchUser())     

            router.push('/')
            router.refresh()

        } catch (error) {
            console.log(error.message)            
        }
    }   
    return(         
		<>
        <li className="nav-item dropdown pe-3">
            <Link className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                {user && user.profile_image ? ( 
                    <Image src={`${process.env.FILE_UPLOAD_URL}/users/${user.profile_image}`} width={50} height={50} alt="" className="rounded-circle" />
                ) : (
                    <Image src={profile_default_img} style={{height:"50px",width:"auto"}} alt="" className="rounded-circle" />
                )}
                <span className="d-none d-md-block dropdown-toggle ps-2">{ AllFunctionClient.shortName(user.name ?? '') }</span>
            </Link>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                <h6>{ user.name }</h6>
                <span>{ user.role?.name ?? '' }</span>
                </li>
                <li>
                <hr className="dropdown-divider" />
                </li>

                <li>
                <Link className="dropdown-item d-flex align-items-center" href="/dashboard/my-profile">
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                </Link>
                </li>
                <li>
                <hr className="dropdown-divider" />
                </li>

                <li>
                <Link className="dropdown-item d-flex align-items-center" href="/dashboard/settings">
                    <i className="bi bi-gear"></i>
                    <span>Account Settings</span>
                </Link>
                </li>
                <li>
                <hr className="dropdown-divider" />
                </li>

                {/* <li>
                <Link className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                </Link>
                </li> */}
                
                <li>
                <hr className="dropdown-divider" />
                </li>

                <li>
                <button className="dropdown-item d-flex align-items-center" onClick={()=>{
                    logout()
                }}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                </button>
                </li>
            </ul>
        </li>
        </>
    )
}
export default Profile_top;