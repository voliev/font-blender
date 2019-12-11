import React from "react";
import { shallow } from "enzyme";
import Main from "../Main";

it("should render without crashing", () => {
  const wrapper = shallow(<Main />);
  expect(wrapper).toMatchSnapshot();
});

it("should render children components", () => {
  const wrapper = shallow(<Main />);
  expect(wrapper.children().length).toBe(3);
});
