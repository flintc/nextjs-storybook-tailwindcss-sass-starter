import { useRouter } from "next/router";
import { useState } from "react";
import { Player } from "../player";
import { PlayersPageProvider } from "../players-page-context";

export default function PlayerPage() {
  const router = useRouter();
  const [state, setState] = useState(false);
  const { id } = router.query;
  return (
    <PlayersPageProvider>
      <Player
        player={{ id, name: "human 5" }}
        state={{ editing: false, expanded: state }}
        setState={() => setState((x) => !x)}
      />
    </PlayersPageProvider>
  );
}
