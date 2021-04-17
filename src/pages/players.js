import React from "react";
import { PlayerListContainer } from "../player-list";
import { usePlayersPageContext } from "../players-page-context";

export default function PlayersPage() {
  // const { PlayerListContainer } = usePlayersPageContext();
  return <PlayerListContainer />;
}
