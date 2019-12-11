import React from "react";
import { mount, shallow } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import FontsListConnected, { FontsList } from "../FontsList";
import Spinner from "../../Spinner";
import * as actions from "../../../actions/fonts";
import { BUNDLE_SIZE, FETCH_FONTS_DATA } from "../../../constants";
import state from "../../../fixtures/state";
import fonts from "../../../fixtures/fonts";
import filteredFonts from "../../../fixtures/filteredFonts";

const setup = (renderFn = shallow, propsOverrides = {}, connected = false) => {
  const props = {
    fetchFontsData: jest.fn(),
    filteredFonts,
    fonts,
    fontsDataStatus: "success",
    listMaxLength: Object.keys(fonts).length,
    ...propsOverrides
  };

  const mockStore = configureStore([thunk]);
  const store = mockStore(state);

  return {
    ...props,
    store,
    wrapper: connected
      ? renderFn(<FontsListConnected store={store} />)
      : renderFn(<FontsList {...props} />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should not crash if filteredFonts array is empty", () => {
  const { wrapper } = setup(shallow, { filteredFonts: [] });

  expect(wrapper).toMatchSnapshot();
});

it("should render loading spinner", () => {
  const { wrapper } = setup(shallow, {
    fontsDataStatus: "",
    filteredFonts: [],
    fonts: {},
    listMaxLength: 0
  });

  let FontsList = wrapper.find(".FontsList");

  expect(FontsList.hasClass("fetching")).toBeTruthy();
  expect(FontsList.children().length).toBe(1);
  expect(FontsList.childAt(0).equals(<Spinner />)).toBeTruthy();

  wrapper.setProps({ fontsDataStatus: "fetching" });

  FontsList = wrapper.find(".FontsList");

  expect(FontsList.hasClass("fetching")).toBeTruthy();
  expect(FontsList.children().length).toBe(1);
  expect(FontsList.childAt(0).equals(<Spinner />)).toBeTruthy();
});

it("should render fonts list on fetching fonts data success", () => {
  const { wrapper } = setup(shallow);

  expect(wrapper.instance().props["fontsDataStatus"]).toBe("success");

  expect(wrapper.find("Spinner").length).toBe(0);
  expect(wrapper.find("VisibleFonts").length).toBe(1);
  expect(wrapper.find("ErrorMessage").length).toBe(0);
});

it("should render error message on fetching fonts data failure", () => {
  const { wrapper } = setup(shallow, {
    fontsDataStatus: "failure",
    filteredFonts: [],
    fonts: {},
    listMaxLength: 0
  });

  expect(wrapper.find("Spinner").length).toBe(0);
  expect(wrapper.find("VisibleFonts").length).toBe(0);
  expect(wrapper.find("ErrorMessage").length).toBe(1);
});

it("should set corresponding state on initial render", () => {
  const { wrapper } = setup();

  expect(wrapper.state("bundleLimit")).toBe(BUNDLE_SIZE);
});

it("should reset state to default on filteredFonts array change", () => {
  const componentDidUpdate = jest.spyOn(
    FontsList.prototype,
    "componentDidUpdate"
  );
  const { wrapper } = setup();

  wrapper.setState({ bundleLimit: BUNDLE_SIZE + 1 });

  expect(wrapper.state("bundleLimit")).toBe(BUNDLE_SIZE + 1);

  const filteredFontsUpdated = filteredFonts.slice(
    Math.round(filteredFonts.length / 2)
  );

  wrapper.setProps({ filteredFonts: filteredFontsUpdated });

  expect(componentDidUpdate).toHaveBeenCalled();
  expect(wrapper.state("bundleLimit")).toBe(BUNDLE_SIZE);
});

it("should change state on font item visibility change", () => {
  const { wrapper } = setup(shallow, { listMaxLength: BUNDLE_SIZE * 3 });

  expect(wrapper.state("bundleLimit")).toBe(BUNDLE_SIZE);

  wrapper.instance().adjustBundleSize(true);

  const expectedBundleLimit = BUNDLE_SIZE * 2;

  expect(wrapper.state("bundleLimit")).toBe(expectedBundleLimit);
});

it("should not change state when font item is not visible", () => {
  const { wrapper } = setup(shallow, { listMaxLength: BUNDLE_SIZE * 3 });

  expect(wrapper.state("bundleLimit")).toBe(BUNDLE_SIZE);

  wrapper.instance().adjustBundleSize(false);

  expect(wrapper.state("bundleLimit")).toBe(BUNDLE_SIZE);
});

it("should set bundle size correctly", () => {
  const { wrapper } = setup(shallow, { listMaxLength: 200 });

  expect(wrapper.state("bundleLimit")).toBe(BUNDLE_SIZE);

  wrapper.instance().adjustBundleSize(true);

  expect(wrapper.state("bundleLimit")).toBe(BUNDLE_SIZE * 2);

  wrapper.setState({ bundleLimit: 170 });
  wrapper.instance().adjustBundleSize(true);

  expect(wrapper.state("bundleLimit")).toBe(200);
});

it("should dispatch an action", () => {
  const { wrapper } = setup(mount, {}, true);

  actions.startFetchFontsData = jest.fn(() => ({
    type: FETCH_FONTS_DATA
  }));

  wrapper
    .find("FontsList")
    .instance()
    .handleFontsDataRequest();

  expect(actions.startFetchFontsData).toHaveBeenCalledTimes(1);
});
