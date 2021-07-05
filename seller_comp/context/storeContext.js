import React, { useState, createContext, useEffect } from "react";
import { useUser } from "../../firebase/useUser";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
const StoreContext = createContext();

function StoreContextProvider({ children }) {
  const { user } = useUser();
  const toast = useToast();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const userId = user?.id;
    axios
      .get("http://localhost:5000/user", {
        params: { userId },
      })
      .then((res) => {
        setUserDetails(res.data.user);
      })
      .catch((error) => {
        return toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  }, [user]);

  return (
    <StoreContext.Provider value={{ user, userDetails }}>
      {user && userDetails && children}
    </StoreContext.Provider>
  );
}

export { StoreContextProvider, StoreContext };
