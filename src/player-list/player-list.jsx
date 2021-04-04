import { atomFamily, useRecoilCallback, useRecoilValueLoadable } from "recoil";
import { Button } from "../components";
import { Player } from "../player";
import { withMaybeRecoilControlledState } from "../hocs";

const expandedStateAtomFamily = atomFamily({
  key: "expandedState",
  default: {
    expanded: false,
  },
});

const PlayerListImpl = ({ players }) => {
  const onExpandAll = useRecoilCallback(
    ({ set }) => () => {
      players.map((player) => {
        set(expandedStateAtomFamily(player.id), (x) =>
          x.expanded ? x : { ...x, expanded: true }
        );
      });
    },
    [players]
  );
  const onCollapseAll = useRecoilCallback(
    ({ set }) => () => {
      players.map((player) => {
        set(expandedStateAtomFamily(player.id), (x) =>
          !x.expanded ? x : { ...x, expanded: false }
        );
      });
    },
    [players]
  );
  return (
    <div>
      <div>
        <Button onClick={onCollapseAll}>collapse all</Button>
        <Button onClick={onExpandAll}>expand all</Button>
      </div>
      {players.map((playerData) => {
        return (
          <div>
            <Player player={playerData} state={expandedStateAtomFamily} />
          </div>
        );
      })}
    </div>
  );
};

const PlayerListConnected = ({ players }) => {
  const players_ = useRecoilValueLoadable(players);
  return (
    <div>
      {players_.state === "hasValue" && (
        <PlayerListImpl players={players_.contents} />
      )}
    </div>
  );
};

export const PlayerList = withMaybeRecoilControlledState(
  "players",
  PlayerListConnected,
  PlayerListImpl
);
