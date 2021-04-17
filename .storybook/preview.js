import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

import "../src/styles/globals.scss";
import { PlayerListContainer } from "../src/player-list";
import { PlayerInfoContainer } from "../src/player-info";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const decorators = [
  (Story, { args: { players, delays = { players: 0, playerInfo: 0 } } }) => {
    const queryClient = new QueryClient();
    queryClient.setQueryDefaults(PlayerListContainer.queryId, {
      queryFn: async () => {
        // console.log("do i get here?");
        await sleep(delays.players);
        return players;
      },
    });
    PlayerInfoContainer.query = async ({ queryKey, ...rest }) => {
      await sleep(delays.playerInfo);
      return players.find((x) => x.id === queryKey[1]);
    };
    // queryClient.setQueryDefaults(
    //   PlayerInfoContainer.queryId({ playerId: x.id }),
    //   {
    //     queryFn: async () => {
    //       await sleep(delays.playerInfo);
    //       return x;
    //     },
    //   }
    // );
    // players.forEach((x) => {
    //   queryClient.setQueryDefaults(
    //     PlayerInfoContainer.queryId({ playerId: x.id }),
    //     {
    //       queryFn: async () => {
    //         await sleep(delays.playerInfo);
    //         return x;
    //       },
    //     }
    //   );
    // });

    return (
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </RecoilRoot>
    );
  },
];
