import "../styles/globals.css";
import Layout from "../components/layout/layout";

import Head from "next/head";

import { NotificationContextProvider } from "../store/notification-context";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0,  width=device-width"
          />
          {/* this meta tag is often added to pages to ensure that the page is responsive and scales correctly and we threfore typically want to add this to all our pages. */}
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;

/*
Besides reusing our Head content inside of a component, we also might have certain Head settings that should be the same across all page components. So, we don't want to copy and paste it into every single page component. Setting it up once in _app.js file to apply to all the pages.
*/
