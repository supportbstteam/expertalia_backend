
import Link from 'next/link'
import Image from "next/image";

import Basic_information from "./Basic_information";

export const metadata = {
  title: "Edit company",
  description: "",
};

const Page = () => {
  return (
    <> 
    <div className="pagetitle">
        <h1>Edit company</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard"><i className="bi bi-house-door"></i></Link></li>
            <li className="breadcrumb-item"><Link href="/dashboard/companies">Companies</Link></li>
            <li className="breadcrumb-item active">Edit company</li>
          </ol>
        </nav>
    </div>
    <section className="section">
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="btnTab-01" data-bs-toggle="tab" data-bs-target="#Tab-01" type="button" role="tab" aria-controls="Tab-01" aria-selected="true">Basic information</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="btnTab-02" data-bs-toggle="tab" data-bs-target="#Tab-02" type="button" role="tab" aria-controls="Tab-02" aria-selected="false">Profit and loss</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="btnTab-03" data-bs-toggle="tab" data-bs-target="#Tab-03" type="button" role="tab" aria-controls="Tab-03" aria-selected="false">Balance</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="btnTab-04" data-bs-toggle="tab" data-bs-target="#Tab-04" type="button" role="tab" aria-controls="Tab-04" aria-selected="false">Business plan</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="btnTab-05" data-bs-toggle="tab" data-bs-target="#Tab-05" type="button" role="tab" aria-controls="Tab-05" aria-selected="false">Shareholders, products and customers</button>
      </li>
    </ul>
    <div className="tab-content" id="myTabContent">
      <div className="tab-pane fade show active my-3" id="Tab-01" role="tabpanel" aria-labelledby="btnTab-01">
        <Basic_information />
      </div>
      <div className="tab-pane fade my-3" id="Tab-02" role="tabpanel" aria-labelledby="btnTab-02">
        Profit and loss...
      </div>
      <div className="tab-pane fade my-3" id="Tab-03" role="tabpanel" aria-labelledby="btnTab-03">
        Balance...
      </div>
      <div className="tab-pane fade my-3" id="Tab-04" role="tabpanel" aria-labelledby="btnTab-04">
        Business plan...
      </div>
      <div className="tab-pane fade my-3" id="Tab-05" role="tabpanel" aria-labelledby="btnTab-05">
        Shareholders, products and customers...
      </div>
    </div>
    </section>
    </>
  );
}
export default Page
