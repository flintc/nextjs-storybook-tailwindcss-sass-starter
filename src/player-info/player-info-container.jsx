import React from "react";
const { request, gql } = require("graphql-request");
const { PlayerInfo } = require("./player-info");
import { useQuery } from "react-query";

const ENDPOINT = `https://mysterious-hollows-61253.herokuapp.com/v1/graphql`;

const resolve = (valueOrFn, props) => {
  if (typeof valueOrFn === "function") {
    return valueOrFn(props);
  } else {
    return valueOrFn;
  }
};

export const PlayerInfoContainer = React.memo(({ playerId }) => {
  const { isLoading, error, data, isFetching } = useQuery(
    resolve(PlayerInfoContainer.queryId, { playerId }),
    async () => {
      const response = await PlayerInfoContainer.query({ playerId });
      return response;
    },
    PlayerInfoContainer.queryOptions
  );
  if (isLoading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }
  if (data) {
    return <PlayerInfo player={data} />;
  }
});

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

PlayerInfoContainer.queryId = ({ playerId }) => `playerInfo-${playerId}`;
PlayerInfoContainer.query = async ({ playerId }) => {
  const resp = await getPlayerInfo(playerId);
  return resp.player[0];
};
PlayerInfoContainer.queryOptions = {
  staleTime: 5 * 60 * 60 * 100,
};
