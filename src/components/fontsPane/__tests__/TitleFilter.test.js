import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import ClearOutlined from "@material-ui/icons/ClearOutlined";
import Search from "@material-ui/icons/Search";
import TitleFilterConnected, { TitleFilter } from "../TitleFilter";
import { SET_TITLE_FILTER } from "../../../constants";
import state from "../../../fixtures/state";

const setup = (renderFn = shallow, propsOverrides = {}, connected = false) => {
  if (connected) {
    const mockStore = configureStore();
    const store = mockStore(state);

    return {
      store,
      wrapper: renderFn(<TitleFilterConnected store={store} />)
    };
  }

  const props = {
    title: "Roboto",
    setTitleFilter: jest.fn(),
    ...propsOverrides
  };

  return {
    ...props,
    wrapper: renderFn(<TitleFilter {...props} />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should not crash if title filter is an empty string", () => {
  const { wrapper } = setup(shallow, { title: "" });

  expect(wrapper).toMatchSnapshot();
});

it("should recieve corresponding props", () => {
  const { wrapper, title, setTitleFilter } = setup(mount);

  expect(typeof wrapper.prop("title")).toBe("string");
  expect(wrapper.prop("title")).toBe(title);
  expect(typeof wrapper.prop("setTitleFilter")).toBe("function");
  expect(wrapper.prop("setTitleFilter")).toBe(setTitleFilter);
});

it('should render the input of type "text"', () => {
  const { wrapper } = setup();

  expect(wrapper.find("input").props().type).toBe("text");
});

it("should render disabled button if title filter is an empty string", () => {
  const { wrapper } = setup(shallow, { title: "" });

  expect(wrapper.find("button").props().disabled).toBeTruthy();
});

it("should activate button if title is NOT an empty string", () => {
  const { wrapper } = setup(mount, { title: "" });

  expect(wrapper.find("button").props().disabled).toBeTruthy();

  wrapper.setProps({ title: "slabo" });

  expect(wrapper.find("button").props().disabled).toBeFalsy();
  expect(wrapper.find("button").hasClass("clickable")).toBeTruthy();
});

it("should handle filter change", () => {
  const { wrapper, setTitleFilter } = setup(shallow, { title: "" });

  const newTitle = "slabo";
  const event = {
    persist: () => {},
    target: {
      value: newTitle
    }
  };

  wrapper.find("input").simulate("change", event);

  expect(setTitleFilter).toHaveBeenCalledTimes(1);
  expect(setTitleFilter).toHaveBeenCalledWith(newTitle);
});

it("should NOT call function on filter change", () => {
  const { wrapper, setTitleFilter } = setup(shallow, { title: "" });

  const event = {
    persist: () => {}
  };

  wrapper.find("input").simulate("change", event);

  expect(setTitleFilter).toHaveBeenCalledTimes(0);
});

it('should handle "clear" button click', () => {
  const { wrapper, setTitleFilter } = setup();

  wrapper.find("button").simulate("click");

  expect(setTitleFilter).toHaveBeenCalledTimes(1);
  expect(setTitleFilter).toHaveBeenCalledWith();
});

it("should debounce handler on input change", () => {
  const { wrapper, setTitleFilter } = setup(mount, { title: "" });

  const input = wrapper.find("input");

  for (let i = 0; i < 100; i++) {
    input.simulate("change");
  }

  expect(setTitleFilter).toHaveBeenCalledTimes(1);
});

it("should change button icon on input change", () => {
  const { wrapper } = setup(shallow, { title: "" });

  expect(wrapper.find(Search).length).toBe(1);

  wrapper.setProps({
    title: "slabo"
  });

  expect(wrapper.find(ClearOutlined).length).toBe(1);
});

it("should dispatch an action", () => {
  const { wrapper, store } = setup(shallow, undefined, true);

  wrapper.prop("setTitleFilter")();

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: SET_TITLE_FILTER,
    title: ""
  });

  wrapper.prop("setTitleFilter")("roboto");

  expect(actions).toContainEqual({
    type: SET_TITLE_FILTER,
    title: "roboto"
  });
});
