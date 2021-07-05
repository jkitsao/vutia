import React from "react";
import axios from "axios";
import ProductPage from "../../../seller_comp/Store/pages/ProductPage";
function product({ data }) {
  return <div>{data.product && <ProductPage product={data.product} />}</div>;
}

export async function getServerSideProps(context) {
  const { productId } = context.query;
  const url = "http://localhost:5000/product";
  const res = await axios.get(url, { params: { productId } });
  console.log(res.data);
  return { props: { data: res.data } };
}

// export default Page;

export default product;
