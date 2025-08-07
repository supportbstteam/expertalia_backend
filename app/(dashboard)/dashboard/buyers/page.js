import Buyers from "./Buyers";

export const metadata = {
  title: "Buyers",
  description: "",
};

const Page = async ({ searchParams }) => {

  const mySearch = await searchParams

  const __filterData = {
    page: (mySearch.page) ? mySearch.page : 1,
    first_name: (mySearch.first_name) ? mySearch.first_name : '',
    last_name: (mySearch.last_name) ? mySearch.last_name : '',
    email: (mySearch.email) ? mySearch.email : '',
    status: (mySearch.status) ? mySearch.status : '',
  }

  return (
    <>
      <Buyers __filterData={__filterData} />
    </>
  );
}
export default Page
