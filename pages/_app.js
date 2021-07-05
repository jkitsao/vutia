import { useState, useEffect } from "react";
import { UserContext } from "../lib/UserContext";
import Router from "next/router";
import { magic } from "../lib/magic";
import Layout from "../components/layout";
import { ThemeProvider } from "@magiclabs/ui";
import "@magiclabs/ui/dist/cjs/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useUser } from "../firebase/useUser";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  // const [user, setUser] = useState();
  const router = useRouter();
  const { user } = useUser();
  //check if user has profile
  async function updateUser(user) {
    const userId = user?.id;
    const res = await axios.get("http://localhost:5000/onboard", {
      params: { userId },
    });
    if (res.data.success) {
      return router.push("/user/onboard");
    } else {
      return;
    }
  }

  useEffect(() => {
    if (user) {
      console.log({ user });

      updateUser(user);
    } else {
      return;
    }
  }, [user]);
  // Otherwise, redirect to /login and set UserContext to { user: null }

  return (
    <ChakraProvider>
      <ThemeProvider root>
        {/* <UserContext.Provider value={[user, setUser]}> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* </UserContext.Provider> */}
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
