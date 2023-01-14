import React from "react";
import { render } from "@testing-library/react";
import MemberCard from "./MemberCard";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <MemberCard
            username="testUser"
            group_id="1"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});