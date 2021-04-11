// import { PlayerInfo } from "../player-info";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Drawer } from "../components";
import { withMaybeRecoilControlledState } from "../hocs";
import { usePlayersPageContext } from "../players-page-context";

const PlayerImpl = ({ player, state, setState }) => {
  // console.log("player", player, state);
  const { PlayerInfoContainer } = usePlayersPageContext();
  // console.log("PlayerInfoContainer", PlayerInfoContainer);
  return (
    <div>
      <div className="flex items-center space-x-4">
        <span>{player.name}</span>
        <Button
          className="btn-violet"
          onClick={() => setState((x) => ({ ...x, expanded: !x.expanded }))}
        >
          more info
        </Button>
      </div>
      <div>
        {/* <Drawer isOpen={state.editing || false}>
          <input defaultValue={player.name} />
        </Drawer> */}
      </div>
      <div>
        <Drawer isOpen={state.expanded}>
          <PlayerInfoContainer playerId={player.id} />
          {/* {playerInfo} */}
        </Drawer>
      </div>
    </div>
  );
};

const PlayerRecoil = ({ state, player, ...props }) => {
  const [foo, setFoo] = useRecoilState(state(player.id));
  return (
    <PlayerImpl player={player} {...props} state={foo} setState={setFoo} />
  );
};

export const Player = withMaybeRecoilControlledState(
  "state",
  PlayerRecoil,
  PlayerImpl
);
