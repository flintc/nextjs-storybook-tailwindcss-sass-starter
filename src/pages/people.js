import { selector, atom, useRecoilValue, selectorFamily } from "recoil";
import { Table } from "../components/table";
import axios from "axios";
import { PlayerList } from "../player-list";
const { request, gql } = require("graphql-request");

const ENDPOINT = `https://mysterious-hollows-61253.herokuapp.com/v1/graphql`;

const getPeople = async () => {
  return request(
    ENDPOINT,
    gql`
      query GetPlayers {
        player {
          id
          name
        }
      }
    `
  );
};

const getPlayerInfo = async (playerId) => {
  return request(
    ENDPOINT,
    gql`
      query GetPlayer($player_id: uuid!) {
        player(where: { id: { _eq: $player_id } }) {
          team {
            id
            name
            score
          }
        }
      }
    `,
    { player_id: playerId }
  );
};

const peopleListState = atom({
  key: "peopleListState",
  default: [],
});

const playerInfoQuery = selectorFamily({
  key: "playerInfoQuery",
  get: (playerId) => async ({ get }) => {
    const response = await getPlayerInfo(playerId);
    console.log("resp", response);
    return response.player[0];
  },
});

const peopleQuery = selector({
  key: "peopleQuery",
  get: async ({ get }) => {
    const response = await getPeople();
    console.log("resp", response);
    return response.player.map((player) => {
      return {
        ...player,
        info: playerInfoQuery(player.id),
      };
    });
    return response.player;
  },
});

export default function People() {
  return <PlayerList players={peopleQuery} />;
}
