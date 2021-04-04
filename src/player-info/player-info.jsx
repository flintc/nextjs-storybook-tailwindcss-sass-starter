import { useRecoilValueLoadable } from "recoil";
import { withMaybeRecoilControlledState } from "../hocs";

const PlayerInfoPure = ({ player }) => (
  <div>
    player info
    <div>
      <span>{player.team.name}</span>
    </div>
  </div>
);

const PlayerInfoStateful = ({ player }) => {
  const player_ = useRecoilValueLoadable(player);
  return (
    <div>
      {player_.state === "hasValue" && (
        <PlayerInfoPure player={player_.contents} />
      )}
    </div>
  );
};

export const PlayerInfo = withMaybeRecoilControlledState(
  "player",
  PlayerInfoStateful,
  PlayerInfoPure
);
