import React from "react";
import { shallow } from "enzyme";
import SettingsPane from "../SettingsPane";

it("should render without crashing", () => {
  const wrapper = shallow(<SettingsPane />);

  expect(wrapper).toMatchSnapshot();
});
