import React from "react";
import ManageStores from "../components/ManageStores";
function Content({ manage, customers, settings }) {
  if (manage)
    return (
      <div className=" w-full">
        <ManageStores />;
      </div>
    );
  if (customers)
    return (
      <div>
        <h1>Customers</h1>
      </div>
    );
  if (settings)
    return (
      <div>
        <h1>settings</h1>
      </div>
    );
}

export default Content;
