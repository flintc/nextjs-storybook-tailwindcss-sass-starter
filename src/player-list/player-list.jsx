import { Button } from "../components";
import { Player } from "../player";
import { useCallback } from "react";
// import { useQueryClient } from "react-query";
import { useQueryClient } from "../hooks";

export const PlayerList = ({ players }) => {
  const queryClient = useQueryClient();
  const onExpandAll = useCallback(() => {
    queryClient.setAllQueryData(["playerState"], { expanded: true });
  }, [queryClient]);
  const onCollapseAll = useCallback(() => {
    queryClient.setAllQueryData(["playerState"], { expanded: false });
  }, [queryClient]);
  return (
    <div>
      <div>
        <Button onClick={onCollapseAll}>collapse all</Button>
        <Button onClick={onExpandAll}>expand all</Button>
      </div>
      {players.map((playerData) => {
        return (
          <div>
            <Player player={playerData} />
          </div>
        );
      })}
    </div>
  );
};
