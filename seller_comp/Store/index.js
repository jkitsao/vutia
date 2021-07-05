import React from "react";
import Dashboard from "./dashboard/Dashboard";
import { useUser } from "../../firebase/useUser";
import { StoreContextProvider } from "../context/storeContext";
function index() {
  const { user } = useUser();

  return (
    <StoreContextProvider>
      <div>
        <Dashboard />
      </div>
    </StoreContextProvider>
  );
}

export default index;
