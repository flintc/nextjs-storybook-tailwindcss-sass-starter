import { RecoilRoot } from "recoil";
import Link from "next/link";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <div className="flex space-x-2">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/people">
          <a>People</a>
        </Link>
      </div>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
