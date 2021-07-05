import React, { useContext } from "react";
import axios from "axios";
import useSWR, { trigger } from "swr";
import Create_store from "../components/create_store/Create_store";
import Stores from "../components/stores/Stores";
import { StoreContext } from "../../context/storeContext";
import Manage_nav from "./Manage_nav";
function ManageStores() {
  const { user, userDetails } = useContext(StoreContext);
  const userId = userDetails._id;
  const fetcher = (url) =>
    axios.get(url, { params: { userId } }).then((res) => res.data);
  const { data, error } = useSWR("http://localhost:5000/store/stores", fetcher);
  console.log(data?.stores);
  return (
    <div>
      {/* <!-- component --> */}
      <div className=" w-full">
        <div className="flex items-center justify-between my-4 pl-4 sm:pr-4">
          <div>
            <Manage_nav user={user} />
          </div>
          <div className="">
            <Create_store trigger={trigger} />
          </div>
        </div>
        <div>
          <Stores userDetails={userDetails} user={user} data={data} />
        </div>
      </div>
    </div>
  );
}

export default ManageStores;
