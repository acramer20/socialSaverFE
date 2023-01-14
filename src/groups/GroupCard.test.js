import React from "react";
import { render } from "@testing-library/react";
import GroupCard from "./GroupCard";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
  let item = { title: "Down Payment Savings", description: "This is a group to save for our first house", target_goal: 2000000};
  const { asFragment } = render(
      <UserProvider>
        <GroupCard item={item} />
      </UserProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
