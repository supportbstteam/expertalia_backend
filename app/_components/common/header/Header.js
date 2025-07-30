"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import Search_bar from './child/Search_bar'
import Notifications from './child/Notifications'
import Messages from './child/Messages'
import Profile_top from './child/Profile_top'

import Image from 'next/image'

//=== import images ====
import logo from "@/app/assets/img/logo.png";

const Header = (props) =>{

	const [isMounted, setIsMounted] = useState(false);
	let [is_sidebar,SetSidebar]     = useState(true);
	
	useEffect(() => {
		setIsMounted(true);  // Ensures HTML only matches after mounting
	}, []);

	useEffect(()=> {
		document.body.classList.remove('toggle-sidebar')
	},[])     


	const toggleSidebar = (is_sidebar)=> {		
		if(is_sidebar){
			document.body.classList.add('toggle-sidebar')			
			SetSidebar(false);			
		}
		else{
			document.body.classList.remove('toggle-sidebar')			
			SetSidebar(true);			  
		}	
	}
	
	return isMounted ? (
		<>
		<header id="header" className="header fixed-top d-flex align-items-center">
			
			<div className="d-flex align-items-center justify-content-between">
			<Link href="/dashboard">
				<Image src={logo} style={{height:"35px", width:"auto"}} alt="" />				
			</Link>
			<i className="bi bi-list toggle-sidebar-btn ms-3" onClick={()=>toggleSidebar(is_sidebar)}></i>
			</div>

			{/* <Search_bar /> */}
			<nav className="header-nav ms-auto">
			<ul className="d-flex align-items-center">

				<li className="nav-item d-block d-lg-none">
				<Link className="nav-link nav-icon search-bar-toggle " href="#">
					<i className="bi bi-search"></i>
				</Link>
				</li>

				{/* <Notifications /> */}
				{/* <Messages /> */}
				<Profile_top />				

			</ul>
			</nav>

		</header>
		</>     
    ) : null
}
export default Header;