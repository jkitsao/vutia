import React from "react";
import Product_header from "../pages/components/Product_header";
import Product_page from "../pages/components/Product_page";
function ProductPage({ product }) {
  return (
    <div>
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1> */}
          <Product_header product={product} />
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" /> */}
            <Product_page product={product} />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
