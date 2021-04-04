import { PlayerInfo } from "../player-info";
import { Button, Drawer } from "../components";
import { useRecoilState } from "recoil";
import {
  withMaybeControlledState,
  withMaybeRecoilControlledState,
} from "../hocs";
import { useState } from "react";

const PlayerPure = ({ player, state, setState }) => (
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
      <Drawer isOpen={state.editing || false}>
        <input defaultValue={player.name} />
      </Drawer>
    </div>
    <div>
      <Drawer isOpen={state.expanded}>
        <PlayerInfo player={player.info} />
      </Drawer>
    </div>
  </div>
);

const PlayerStateful = ({ defaultState, ...props }) => {
  const [state, setState] = useState(defaultState);
  return <PlayerPure {...props} state={state} setState={setState} />;
};

export const PlayerRecoilStateful = ({ player, state }) => {
  const [foo, setFoo] = useRecoilState(state(player.id));
  return <PlayerPure player={player} state={foo} setState={setFoo} />;
};

export const Player = withMaybeRecoilControlledState(
  "state",
  PlayerRecoilStateful,
  withMaybeControlledState("state", PlayerStateful, PlayerPure)
);
