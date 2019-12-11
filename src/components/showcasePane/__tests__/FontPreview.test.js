import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import FontPreviewConnected, { FontPreview } from "../FontPreview";
import FontPreviewInfo from "../FontPreviewInfo";
import FontPreviewStyles from "../FontPreviewStyles";
import Spinner from "../../Spinner";
import * as fontsActions from "../../../actions/fonts";
import fonts from "../../../fixtures/fonts";
import state from "../../../fixtures/state";

const setup = (
  renderFn = shallow,
  family = "Roboto",
  propsOverrides = {},
  connected = false
) => {
  const font = fonts[family];
  const props = {
    category: font.category,
    family: font.family,
    fetched: font.fetched,
    fetchFont: jest.fn(),
    fetching: font.fetching,
    subsets: font.subsets,
    variants: font.variants,
    ...propsOverrides
  };

  if (connected) {
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      ...state,
      showcase: {
        ...state.showcase,
        fontPreview: {
          ...state.showcase.fontPreview,
          isVisible: true,
          family: "Roboto"
        }
      }
    });

    return {
      store,
      wrapper: renderFn(<FontPreviewConnected store={store} />)
    };
  }

  return {
    ...props,
    wrapper: renderFn(<FontPreview {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should set corresponding component classes", () => {
  const { wrapper } = setup();

  expect(wrapper.hasClass("FontPreview")).toBeTruthy();
  expect(wrapper.hasClass("fetching")).toBeTruthy();
  expect(wrapper.hasClass("error")).toBeFalsy();

  wrapper.setState({ showSpinner: false });
  wrapper.setProps({ fetched: true });

  expect(wrapper.hasClass("FontPreview")).toBeTruthy();
  expect(wrapper.hasClass("fetching")).toBeFalsy();
  expect(wrapper.hasClass("error")).toBeFalsy();

  wrapper.setState({ showSpinner: false });
  wrapper.setProps({ fetched: false });

  expect(wrapper.hasClass("FontPreview")).toBeTruthy();
  expect(wrapper.hasClass("fetching")).toBeFalsy();
  expect(wrapper.hasClass("error")).toBeTruthy();
});

it("should render spinner", () => {
  const { wrapper } = setup();

  expect(wrapper.find(Spinner).length).toBe(1);
  expect(wrapper.find(FontPreviewInfo).length).toBe(0);
  expect(wrapper.find(FontPreviewStyles).length).toBe(0);
});

it("should render preview font", () => {
  const { wrapper } = setup(shallow, "Roboto", { fetched: true });

  wrapper.setState({ showSpinner: false });

  expect(wrapper.find(Spinner).length).toBe(0);
  expect(wrapper.find(FontPreviewInfo).length).toBe(1);
  expect(wrapper.find(FontPreviewStyles).length).toBe(1);
});

it("should receive corresponding props", () => {
  const family = "Roboto";
  const { wrapper } = setup(shallow, family, undefined, true);

  expect(wrapper.prop("family")).toBe(family);
  expect(wrapper.prop("category")).toBe(fonts[family].category);
  expect(wrapper.prop("variants")).toStrictEqual(fonts[family].variants);
  expect(wrapper.prop("subsets")).toStrictEqual(fonts[family].subsets);
  expect(wrapper.prop("fetched")).toBe(fonts[family].fetched);
});

it("should render spinner and fetch font", () => {
  const { family, fetchFont, wrapper } = setup();

  expect(wrapper.state("showSpinner")).toBeTruthy();

  wrapper.setState({ showSpinner: false });

  expect(wrapper.state("showSpinner")).toBeFalsy();

  wrapper.instance().handleTryAgainButtonClick();

  expect(wrapper.state("showSpinner")).toBeTruthy();
  expect(fetchFont).toHaveBeenCalledTimes(1);
  expect(fetchFont).toHaveBeenLastCalledWith(family);
});

it("should hide spinner", () => {
  const { wrapper } = setup();

  expect(wrapper.instance().props.fetching).toBeFalsy();

  wrapper.setProps({ fetching: true });

  expect(wrapper.instance().props.fetching).toBeTruthy();
  expect(wrapper.instance().state.showSpinner).toBeTruthy();

  wrapper.setProps({ fetching: false });

  expect(wrapper.instance().props.fetching).toBeFalsy();
  expect(wrapper.instance().state.showSpinner).toBeFalsy();
});

it("should show spinner", () => {
  const { wrapper } = setup();

  expect(wrapper.instance().props.family).toBe("Roboto");
  expect(wrapper.instance().state.showSpinner).toBeTruthy();

  wrapper.setState({ showSpinner: false });

  expect(wrapper.instance().state.showSpinner).toBeFalsy();

  wrapper.setProps({ ...fonts["Lato"] });

  expect(wrapper.instance().props.family).toBe("Lato");
  expect(wrapper.instance().state.showSpinner).toBeTruthy();
});

it("should call startFetchFont action creator", () => {
  const { wrapper } = setup(shallow, "Roboto", {}, true);

  const startFetchFont = jest
    .spyOn(fontsActions, "startFetchFont")
    .mockImplementation(family => () => family);

  wrapper.find("FontPreview").prop("fetchFont")("Roboto");

  expect(startFetchFont).toHaveBeenCalledTimes(1);
  expect(startFetchFont).toHaveLastReturnedWith(expect.any(Function));
  expect(startFetchFont.mock.results[0].value()).toBe("Roboto");
});
