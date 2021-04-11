import { PlayersPageMockProvider } from "../players-page-context";
import PlayerPage from "../pages/players";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default {
  title: "Player List",
  decorators: [
    (
      Story,
      { args: { players, delays = { players: 0, playerInfo: 0 } }, ...rest }
    ) => {
      return (
        <PlayersPageMockProvider
          spec={{
            players: {
              query: async () => {
                await sleep(delays.players);
                return players;
              },
            },
            playerInfo: {
              query: async ({ playerId }) => {
                await sleep(delays.playerInfo);
                return players.find((x) => x.id === playerId);
              },
              queryOptions: { staleTime: 0 },
            },
          }}
        >
          <Story />
        </PlayersPageMockProvider>
      );
    },
  ],
  // component: PlayerList,
};

export const FakeData = () => {
  return <PlayerPage />;
};

FakeData.args = {
  players: [
    { name: "Gerald", id: "gerald", team: { name: "foo" } },
    { name: "Leooo??", id: "leo", team: { name: "barr" } },
  ],
};

export const FakeDataFetched = () => {
  return <PlayerPage />;
};

FakeDataFetched.args = {
  players: [
    { name: "Gerald", id: "gerald", team: { name: "foo" } },
    { name: "Leooo??", id: "leo", team: { name: "barr" } },
  ],
  delays: {
    players: 1000,
    playerInfo: 1500,
  },
};
