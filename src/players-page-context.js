import React, { useContext } from "react";
import { PlayerInfoContainer, PlayerInfo } from "./player-info";
import { PlayerListContainer, PlayerList } from "./player-list";
const ENDPOINT = `https://mysterious-hollows-61253.herokuapp.com/v1/graphql`;

export const PlayersPageContext = React.createContext({});

export const usePlayersPageContext = () => {
  return useContext(PlayersPageContext);
};

export const PlayersPageProvider = ({ children }) => {
  return (
    <PlayersPageContext.Provider
      value={{ PlayerInfoContainer, PlayerListContainer }}
    >
      {children}
    </PlayersPageContext.Provider>
  );
};

const getMockContainers = (spec) => {
  const PlayerInfoMockContainer = React.memo(({ playerId }) => {
    if (typeof spec.playerInfo?.query === "function") {
      for (let k in spec.playerInfo) {
        PlayerInfoContainer[k] = spec.playerInfo[k];
      }
      return <PlayerInfoContainer playerId={playerId} />;
    }
    return <PlayerInfo player={spec.playerInfo} />;
  });

  const PlayerListMockContainer = () => {
    if (typeof spec.players?.query === "function") {
      for (let k in spec.players) {
        PlayerListContainer[k] = spec.players[k];
      }
      return <PlayerListContainer />;
    }
    return <PlayerList players={spec.players} />;
  };
  return {
    PlayerInfoContainer: PlayerInfoMockContainer,
    PlayerListContainer: PlayerListMockContainer,
  };
};

export const PlayersPageMockProvider = ({ children, spec }) => {
  return (
    <PlayersPageContext.Provider value={getMockContainers(spec)}>
      {children}
    </PlayersPageContext.Provider>
  );
};
