import React from "react";
import { shallow } from "enzyme";
import FontsPane from "../FontsPane";

it("should render without crashing", () => {
  const wrapper = shallow(<FontsPane />);
  expect(wrapper).toMatchSnapshot();
});

it("should render children components", () => {
  const wrapper = shallow(<FontsPane />);
  expect(wrapper.children().length).toBe(5);
});
