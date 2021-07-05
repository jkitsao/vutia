import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR, { trigger } from "swr";
import Store_page from "../../seller_comp/Store/store_page/Store_page";
function Page({ data }) {
  return (
    <>
      {data?.store && (
        <div>
          <Store_page store={data?.store} />
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { storename } = context.query;
  const url = "http://localhost:5000/store";
  const res = await axios.get(url, { params: { storename } });
  console.log(res.data);
  return { props: { data: res.data } };
}

export default Page;
