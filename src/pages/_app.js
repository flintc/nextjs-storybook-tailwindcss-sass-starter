import Link from "next/link";
import { QueryClient, QueryClientProvider } from "react-query";
import { PlayerListContainer } from "../player-list";
import { PlayersPageProvider } from "../players-page-context";

const queryClient = new QueryClient();
queryClient.setQueryDefaults(PlayerListContainer.queryId, {
  queryFn: PlayerListContainer.query,
  options: PlayerListContainer.queryOptions,
});

import "../styles/globals.scss";
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PlayersPageProvider>
        <div className="flex space-x-2">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/players">
            <a>People</a>
          </Link>
          <Link href="/player/?id=0aed4f1c-1249-485f-b64c-3047ffb251bc">
            <a>Player d</a>
          </Link>
        </div>
        <Component {...pageProps} />
      </PlayersPageProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
