import React from "react";
import { usePlayersPageContext } from "../players-page-context";

export default function PlayersPage() {
  const { PlayerListContainer } = usePlayersPageContext();
  return <PlayerListContainer />;
}
