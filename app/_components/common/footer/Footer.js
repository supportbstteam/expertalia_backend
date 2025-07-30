"use client"
import Link from 'next/link'
import Image from 'next/image'

const Footer_comp = (props)=> {
	return (
		<>
		<footer id="footer" className="footer sticky-footer">
			<div className="copyright">
			&copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
			</div>
			<div className="credits">     
			Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
			</div>
		</footer>
  		<Link href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link> 
		</>
	);
}
export default Footer_comp;