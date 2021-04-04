import { useState } from "react";
import { Button } from "../button";
import { Drawer } from "./drawer";

export default {
  title: "Drawer",
  component: Drawer,
};

export const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen((x) => !x)} className="btn-green">
        {isOpen ? "close" : "open"}
      </Button>
      <Drawer isOpen={isOpen}>Hello</Drawer>
    </div>
  );
};
