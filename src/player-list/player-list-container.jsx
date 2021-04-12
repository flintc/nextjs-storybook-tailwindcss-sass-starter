import React from "react";
const { request, gql } = require("graphql-request");
const { PlayerList } = require("./player-list");
import { useQuery } from "react-query";

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

const resolve = (valueOrFn, props) => {
  if (typeof valueOrFn === "function") {
    return valueOrFn(props);
  } else {
    return valueOrFn;
  }
};

export const PlayerListContainer = () => {
  // const { isLoading, error, data, isFetching } = useQuery(
  //   resolve(PlayerListContainer.queryId),
  //   PlayerListContainer.query,
  //   PlayerListContainer.queryOptions
  // );
  const { isLoading, error, data, isFetching } = useQuery(
    PlayerListContainer.queryId
  );
  if (isLoading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }
  if (data) {
    return <PlayerList players={data} />;
  }
};

PlayerListContainer.queryId = "playerList";
PlayerListContainer.query = async () => {
  const response = await getPeople();
  return response.player;
};
PlayerListContainer.queryOptions = { staleTime: 5 * 60 * 60 * 100 };
