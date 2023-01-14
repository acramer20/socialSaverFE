import React from "react";
import { render } from "@testing-library/react";
import Groups from "./GroupList";

it("renders without crashing", function() {
  render(<Groups />);
});

it("matches snapshot with no groups", function() {
  const { asFragment } = render(<Groups />);
  expect(asFragment()).toMatchSnapshot();
});
