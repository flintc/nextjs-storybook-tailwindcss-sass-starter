import { Button } from ".";
export default {
  title: "Buttons",
};

export const AButton = (args) => {
  return (
    <div>
      <Button className="btn-violet " {...args} />
    </div>
  );
};

AButton.args = {
  children: "Button",
};
