
//== import external css ===
import "@/app/assets/vendor/bootstrap/css/bootstrap.min.css";
import "@/app/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "@/app/assets/vendor/boxicons/css/boxicons.min.css";
//import "@/app/assets/vendor/quill/quill.snow.css";
//import "@/app/assets/vendor/quill/quill.bubble.css";
import "@/app/assets/vendor/remixicon/remixicon.css";
import "@/app/assets/css/style.css";

//== import globals css ===
import "@/app/globals.css";

//== import google font ===
import { Open_Sans, Nunito, Poppins } from 'next/font/google'
const google_font = Nunito({
  subsets: ['latin'],
})

import ReduxProvider from '@/app/_library/redux/ReduxProvider';
import Script from 'next/script'

export default function AdminLayout({ children }) {
  return (
    <>
    <html lang="en" className={google_font.className}>
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />      
      </head>
      <body suppressHydrationWarning={true}>  
      <ReduxProvider>{children}</ReduxProvider>
      {/* <Script src="/assets/vendor/apexcharts/apexcharts.min.js" /> */}
      <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" />
      {/* <Script src="/assets/vendor/chart.js/chart.min.js" /> */}
      {/* <Script src="/assets/vendor/echarts/echarts.min.js" /> */}
      {/* <Script src="/assets/vendor/quill/quill.min.js" /> */}
      {/* <Script src="/assets/vendor/simple-datatables/simple-datatables.js" /> */}
      {/* <Script src="/assets/vendor/tinymce/tinymce.min.js" />      */}
      {/* <Script src="/assets/js/main.js" />  */}   
      </body>
    </html>
    </>
  );
}
