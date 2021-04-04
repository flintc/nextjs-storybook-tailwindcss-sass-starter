import { Player } from "./player";

export default {
  title: "Player",
  component: Player,
};

export const Example = () => {
  return (
    <Player
      player={{
        name: "Gary",
        info: {
          team: { name: "AAAAA" },
        },
      }}
      defaultState={{ expanded: false, editing: true }}
    />
  );
};
