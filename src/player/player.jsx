import { Button, Drawer } from "../components";
import { useSharedState } from "../hooks";
import { usePlayersPageContext } from "../players-page-context";

export const Player = ({ player }) => {
  const { PlayerInfoContainer } = usePlayersPageContext();
  const [state, setState] = useSharedState(["playerState", { id: player.id }], {
    expanded: false,
  });
  return (
    <div>
      <div className="flex items-center space-x-4">
        <span>{player.name}</span>
        <Button
          className="btn-violet"
          onClick={() =>
            setState((x) => {
              return { ...x, expanded: !x.expanded };
            })
          }
        >
          more info
        </Button>
      </div>
      <div>
        <Drawer isOpen={state.expanded}>
          <PlayerInfoContainer playerId={player.id} />
        </Drawer>
      </div>
    </div>
  );
};
