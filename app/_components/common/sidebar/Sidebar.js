"use client"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Sidebar = (props)=> {
	
	const pathname = usePathname()
	let ccp2  = pathname.split('/')
	let current_path  = (ccp2[2]) ? ccp2[2] : ''	
	//console.log(current_path)

	const dashboard_menu  = [''];  
	const settings_menu   = ['settings','settings/create','settings/edit'];
	const users_menu   	  = ['users','users/create','users/edit'];	

	const page_child_1    = ['pages','pages/create','pages/edit'];  
	const page_child_2    = ['blocks','blocks/create','blocks/edit'];   
	const page_menu       = [
							...page_child_1,
							...page_child_2,									
						  ]; 

    const service_child_1 = ['service-category','service-category/create','service-category/edit'];  
	const service_child_2 = ['services','services/create','services/edit'];   
    const services_menu   = [
							...service_child_1,
							...service_child_2,									
						  ]; 


	const company_child_1 = ['company-users','company-users/create','company-users/edit'];  
	const company_child_2 = ['companies','companies/create','companies/edit'];  
	const company_menu    = [
							...company_child_1,
							...company_child_2,									
						  ];  

	return (
		<>
		<aside id="sidebar" className="sidebar">
			<ul className="sidebar-nav" id="sidebar-nav">

			<li className="nav-item">
				<Link className={`nav-link ${dashboard_menu.includes(current_path) ? '' : 'collapsed'}`} href="/dashboard">
				<i className="bi bi-grid"></i>
				<span>Dashboard</span>
				</Link>
			</li>

			<li className="nav-item">
				<Link className={`nav-link ${settings_menu.includes(current_path) ? '' : 'collapsed'}`} href="/dashboard/settings">
				<i className="bi bi-gear"></i>
				<span>Settings</span>
				</Link>
			</li>


			<li className="nav-item">
				<Link className={`nav-link ${page_menu.includes(current_path) ? '' : 'collapsed'}`} data-bs-target="#pages-nav" data-bs-toggle="collapse" href="#">
				<i className="bi bi-card-text"></i><span>Pages</span><i className="bi bi-chevron-down ms-auto"></i>
				</Link>
				<ul id="pages-nav" className={`nav-content collapse ${page_menu.includes(current_path) ? 'show' : ''}`}  data-bs-parent="#sidebar-nav">
				<li>
					<Link href="/dashboard/pages" className={`${page_child_1.includes(current_path) ? 'active' : ''}`}>
					<i className="bi bi-circle"></i><span>Manage Pages</span>
					</Link>
				</li>
				<li>
					<Link href="/dashboard/blocks" className={`${page_child_2.includes(current_path) ? 'active' : ''}`}>
					<i className="bi bi-circle"></i><span>Manage Blocks</span>
					</Link>
				</li>
				</ul>
			</li>	
			

			<li className="nav-item">
				<Link className={`nav-link ${services_menu.includes(current_path) ? '' : 'collapsed'}`} data-bs-target="#services-nav" data-bs-toggle="collapse" href="#">
				<i className="bi bi-flag-fill"></i><span>Services</span><i className="bi bi-chevron-down ms-auto"></i>
				</Link>
				<ul id="services-nav" className={`nav-content collapse ${services_menu.includes(current_path) ? 'show' : ''}`}  data-bs-parent="#sidebar-nav">
				<li>
					<Link href="/dashboard/service-category" className={`${service_child_1.includes(current_path) ? 'active' : ''}`}>
					<i className="bi bi-circle"></i><span>Service categories</span>
					</Link>
				</li>
				<li>
					<Link href="/dashboard/services" className={`${service_child_2.includes(current_path) ? 'active' : ''}`}>
					<i className="bi bi-circle"></i><span>Services</span>
					</Link>
				</li>
				</ul>
			</li>	


			<li className="nav-item">
				<Link className={`nav-link ${company_menu.includes(current_path) ? '' : 'collapsed'}`} data-bs-target="#company-nav" data-bs-toggle="collapse" href="#">
				<i className="bi bi-building"></i><span>Companies</span><i className="bi bi-chevron-down ms-auto"></i>
				</Link>
				<ul id="company-nav" className={`nav-content collapse ${company_menu.includes(current_path) ? 'show' : ''}`} data-bs-parent="#sidebar-nav">
				<li>
					<Link href="/dashboard/company-users" className={`${company_child_1.includes(current_path) ? 'active' : ''}`}>
					<i className="bi bi-circle"></i><span>Company Users</span>
					</Link>
				</li>
				<li>
					<Link href="/dashboard/companies" className={`${company_child_2.includes(current_path) ? 'active' : ''}`}>
					<i className="bi bi-circle"></i><span>Companies</span>
					</Link>
				</li>				
				</ul>
			</li>


		
			<li className="nav-item">
				<Link className="nav-link collapsed" data-bs-target="#user-nav" data-bs-toggle="collapse" href="#">
				<i className="bi bi-people"></i><span>Admins</span><i className="bi bi-chevron-down ms-auto"></i>
				</Link>
				<ul id="user-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
				<li>
					<Link href="/dashboard/user-role">
					<i className="bi bi-circle"></i><span>Manage Role</span>
					</Link>
				</li>
				<li>
					<Link href="/dashboard/users">
					<i className="bi bi-circle"></i><span>Manage Admins</span>
					</Link>
				</li>				
				</ul>
			</li>

			
			<li className="nav-item">
				<Link className="nav-link collapsed" href="/dashboard/banner-category">
				<i className="bi bi-images"></i>
				<span>Banners</span>
				</Link>
			</li>	
	

			<li className="nav-item">
				<Link className="nav-link collapsed" href="/dashboard/email-templates">
				<i className="bi bi-envelope"></i>
				<span>Email Templates</span>
				</Link>
			</li>	

			<li className="nav-item">
				<Link className="nav-link collapsed" data-bs-target="#blog-nav" data-bs-toggle="collapse" href="#">
				<i className="bi bi-signpost-split-fill"></i><span>Blog</span><i className="bi bi-chevron-down ms-auto"></i>
				</Link>
				<ul id="blog-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
				<li>
					<Link href="/dashboard/blog-category">
					<i className="bi bi-circle"></i><span>Blog Category</span>
					</Link>
				</li>
				<li>
					<Link href="/dashboard/blogs">
					<i className="bi bi-circle"></i><span>Blogs</span>
					</Link>
				</li>				
				</ul>
			</li>	
			

			<li className="nav-item">
				<Link className="nav-link collapsed" href="/dashboard/faq">
				<i className="bi bi-question-circle"></i>
				<span>F.A.Q</span>
				</Link>
			</li>

			<li className="nav-item">
				<Link className="nav-link collapsed" href="/dashboard/testimonial">
				<i className="bi bi-chat-dots-fill"></i>
				<span>Testimonial</span>
				</Link>
			</li>	

			<li className="nav-item">
				<Link className="nav-link collapsed" href="/dashboard/contact">
				<i className="bi bi-envelope"></i>
				<span>Contact</span>
				</Link>
			</li>	
			

			</ul>

		</aside>
		</>
	);
}
export default Sidebar;