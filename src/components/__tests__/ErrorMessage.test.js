import React from "react";
import { shallow } from "enzyme";
import ErrorMessage from "../ErrorMessage";

const setup = (msg = <p>Oops! Something went wrong...</p>) =>
  shallow(<ErrorMessage>{msg}</ErrorMessage>);

it("should render without crashing", () => {
  const wrapper = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should render error message", () => {
  const wrapper = setup();

  expect(wrapper.children().length).toBe(1);
  expect(
    wrapper.childAt(0).matchesElement(<p>Oops! Something went wrong...</p>)
  ).toBeTruthy();
});
