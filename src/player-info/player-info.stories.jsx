import { PlayerInfo } from "./player-info";

export default {
  title: "Player Info",
  component: PlayerInfo,
};

export const Normal = () => {
  return <PlayerInfo player={{ team: { name: "foobar" } }} />;
};
