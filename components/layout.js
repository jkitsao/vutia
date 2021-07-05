import Head from "next/head";
import Header from "./header";
import Navigation from "./Navigation";

const Layout = (props) => (
  <>
    <Head>
      <title>Magic</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {/* <Header /> */}
    {/* <Navigation /> */}
    <main>
      <div>{props.children}</div>
    </main>
    <style jsx global>{`
      * {
        font-family: sans-serif !important;
        outline: none;
      }
    `}</style>
  </>
);

export default Layout;
