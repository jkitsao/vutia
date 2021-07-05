/* This example requires Tailwind CSS v2.0+ */
import Product_table from "./Product_table";

import axios from "axios";
import useSWR, { trigger } from "swr";
export default function Store_products({ store }) {
  const storeId = store?._id;
  const fetcher = (url) =>
    axios.get(url, { params: { storeId } }).then((res) => res.data);
  const { data, error } = useSWR("http://localhost:5000/product/id", fetcher);
  //return UI
  if (error) throw error;
  if (!data?.products) {
    return <div className="p-32 text-2xl font-semibold">No data</div>;
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3  text-center text-xs text-gray-500 uppercase tracking-wider font-bold"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-bold"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-bold"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider font-bold"
                  >
                    Price
                  </th>
                  <th scope="col" className="relative text-gray-600 px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <Product_table products={data?.products} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
