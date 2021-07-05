import React from "react";
import axios from "axios";
import useSWR from "swr";
import Store_card from "./Store_card";
import { StoreContext } from "../../../context/storeContext";
function Stores({ userDetails, data }) {
  return (
    <div className="w-full max-h-screen flex flex-wrap">
      {data?.stores.map((store, index) => (
        <div className="m-3">
          <Store_card store={store} key={index} />
        </div>
      ))}
    </div>
  );
}

export default Stores;
