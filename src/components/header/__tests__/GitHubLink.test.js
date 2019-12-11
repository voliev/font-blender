import React from "react";
import { shallow } from "enzyme";
import { GitHubLink } from "../GitHubLink";

it("should render without crashing", () => {
  const wrapper = shallow(<GitHubLink />);

  expect(wrapper).toMatchSnapshot();
});
