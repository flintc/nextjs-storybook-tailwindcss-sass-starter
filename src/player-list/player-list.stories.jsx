import { PlayersPageMockProvider } from "../players-page-context";
import PlayerPage from "../pages/players";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default {
  title: "Player List",
  decorators: [],
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
