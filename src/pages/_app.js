import "@/styles/globals.css";
import Nav from "../components/Nav";

import localFont from "@next/font/local";
const font = localFont({
  src: "../../public/Brand.woff",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav font={font} className={font.className} />
      <Component {...pageProps} />
    </>
  );
}
