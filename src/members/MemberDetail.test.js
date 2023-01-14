import React from "react";
import { render } from "@testing-library/react";
import Member from "./MemberDetail";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <Member />
        </UserProvider>
      </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter initialEntries={["/member/ibm"]}>
        <UserProvider>
          <Route path="/member/:id">
            <Member />
          </Route>
        </UserProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});

// check line 19 initialEntries={["/member/ibm"]} what goes after /member/?
