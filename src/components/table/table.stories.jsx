import { selector } from "recoil";
import { Table } from ".";

export default {
  title: "Tables",
  component: Table,
};

const peopleQuery = selector({
  key: "CurrentPeopleList",
  get: () => {
    return [{ name: "Dummy name" }];
  },
});

export const Example = () => {
  return (
    <div>
      <Table items={peopleQuery} />
    </div>
  );
};
