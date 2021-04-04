import { selector, selectorFamily } from "recoil";
import { PlayerList } from "./player-list";

export default {
  title: "Player List",
  // component: PlayerList,
};

const players = [
  { name: "Gerald", id: "gerald", info: { team: { name: "foo" } } },
  { name: "Leo", id: "leo", info: { team: { name: "bar" } } },
];

export const FakeData = () => {
  return (
    <div>
      <PlayerList players={players} />
    </div>
  );
};

const playerInfoQuery = selectorFamily({
  key: "playerInfoQuery",
  get: (playerId) => async ({ get }) => {
    // const response = await getPlayerInfo(playerId);
    // console.log("resp", response);
    return { team: { name: "foo" } };
  },
});

const playersQuery = selector({
  key: "peopleQuery",
  get: async ({ get }) => {
    return players.map((player) => {
      return { ...player, info: playerInfoQuery(player.id) };
    });
    // return players;
  },
});

export const FakeFetchedData = () => {
  return (
    <div>
      <PlayerList players={playersQuery} />
    </div>
  );
};
