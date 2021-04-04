import { useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { PlayerInfo } from "../../player-info/player-info";
import { Button } from "../button";
import { Drawer } from "../drawer";

export function Table({ items }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const items_ = useRecoilValueLoadable(items);
  console.log("items", items_);
  return (
    <div>
      {items_.state === "hasValue" &&
        items_.contents.map((item) => {
          console.log("item", item);
          return (
            <div>
              <div className="flex items-center space-x-4">
                <span>{item.name}</span>
                <Button
                  className="btn-violet"
                  onClick={() => setDrawerOpen((x) => !x)}
                >
                  more info
                </Button>
              </div>
              <div>
                <Drawer isOpen={drawerOpen}>
                  <PlayerInfo player={item.info} />
                </Drawer>
              </div>
            </div>
          );
        })}
    </div>
  );
}
