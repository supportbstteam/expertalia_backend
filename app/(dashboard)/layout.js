
import Header from '@/app/_components/common/header/Header';
import Footer from '@/app/_components/common/footer/Footer';
import Sidebar from '@/app/_components/common/sidebar/Sidebar';

export default function Dashboard_layout({ children }) {
  return (
    <>    
      <Header />
      <Sidebar />
      <main id="main" className="main main-container">
      {children} 
      </main>  
      <Footer />  
    </>
  );
}
