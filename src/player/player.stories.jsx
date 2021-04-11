import { Player } from "./player";
import { PlayersPageContext } from "../players-page-context";
import { PlayerInfo } from "../player-info/player-info";
export default {
  title: "Player",
  component: Player,
};

const PlayerInfoContainer = ({ playerId }) => {
  return <PlayerInfo player={{ team: { name: "boobar" } }} />;
};

export const Example = ({ player, state }) => {
  return (
    <PlayersPageContext.Provider value={{ PlayerInfoContainer }}>
      <Player
        player={player}
        state={state}
        // defaultState={{ expanded: false, editing: true }}
      />
    </PlayersPageContext.Provider>
  );
};

Example.args = {
  player: {
    name: "Gary",
    id: "gary",
  },
  state: {
    editing: false,
    expanded: true,
  },
};
