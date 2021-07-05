import React from "react";
import Link from "next/link";
function Product_table({ products }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {products.map((product) => (
        <tr
          key={product._id}
          className=" hover:bg-gray-50 hover:shadow-md transition-all duration-150"
        >
          <td className="px-6 py-4 ">
            <div className="lg:w-1/2 my-auto mx-auto">
              {/* <div className=""> */}
              <img
                className="h-10 w-10 lg:h-16 lg:w-16 rounded lg:mt-8 inline-block object-cover "
                //   src={person.image}
                src={`https://picsum.photos/200/300?random=${Math.floor(
                  Math.random() * 200989
                )}`}
                alt=""
              />
            </div>
          </td>
          <td className="px-6 py-4 max-w-md whitespace-pre-wrap ">
            <div className="text-sm text-gray-700 font-semibold p-1">
              {product.title}
            </div>
            <div className="text-xs text-gray-500 max-w-md whitespace-pre-wrap ">
              {product.description.slice(0, 100)}...
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 ${
                product.isAvailable ? "text-green-800" : "text-red-800"
              }`}
            >
              {product.isAvailable ? "available" : "not available"}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {product.price}$
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              type="button"
              class="border border-green-500 cursor-pointer text-green-500 px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-green-600 focus:outline-none focus:shadow-outline"
            >
              <Link href={`/manage/products/${product?._id}`}>
                <a>view</a>
              </Link>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default Product_table;
