import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import ShowcasePaneConnected, { ShowcasePane } from "../ShowcasePane";
import ShowcasePaneHeader from "../ShowcasePaneHeader";
import SampleText from "../SampleText";
import StylesView from "../StylesView";
import FontPreview from "../FontPreview";
import state from "../../../fixtures/state";

const setup = (
  renderFn = shallow,
  propsOverrides = {},
  provideStore = false
) => {
  const props = {
    textIsVisible: true,
    fontPreviewIsVisible: false,
    stylesIsVisible: false,
    ...propsOverrides
  };

  if (provideStore) {
    const mockStore = configureStore();
    const store = mockStore(state);

    return {
      ...props,
      store,
      wrapper: renderFn(
        <Provider store={store}>
          <ShowcasePaneConnected />
        </Provider>
      )
    };
  }

  return {
    ...props,
    wrapper: renderFn(<ShowcasePane {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const {
    fontPreviewIsVisible,
    stylesIsVisible,
    textIsVisible,
    wrapper
  } = setup(mount, undefined, true);

  expect(typeof wrapper.find(ShowcasePane).prop("textIsVisible")).toBe(
    "boolean"
  );
  expect(wrapper.find(ShowcasePane).prop("textIsVisible")).toBe(textIsVisible);

  expect(typeof wrapper.find(ShowcasePane).prop("fontPreviewIsVisible")).toBe(
    "boolean"
  );
  expect(wrapper.find(ShowcasePane).prop("fontPreviewIsVisible")).toBe(
    fontPreviewIsVisible
  );

  expect(typeof wrapper.find(ShowcasePane).prop("stylesIsVisible")).toBe(
    "boolean"
  );
  expect(wrapper.find(ShowcasePane).prop("stylesIsVisible")).toBe(
    stylesIsVisible
  );
});

it("should render corresponding underlying components on props change", () => {
  const { wrapper } = setup();

  expect(wrapper.find(SampleText).length).toBe(1);
  expect(wrapper.find(ShowcasePaneHeader).length).toBe(0);
  expect(wrapper.find(FontPreview).length).toBe(0);
  expect(wrapper.find(StylesView).length).toBe(0);

  wrapper.setProps({
    textIsVisible: false,
    fontPreviewIsVisible: true,
    stylesIsVisible: false
  });

  expect(wrapper.find(SampleText).length).toBe(0);
  expect(wrapper.find(ShowcasePaneHeader).length).toBe(1);
  expect(wrapper.find(FontPreview).length).toBe(1);
  expect(wrapper.find(StylesView).length).toBe(0);

  wrapper.setProps({
    textIsVisible: false,
    fontPreviewIsVisible: false,
    stylesIsVisible: true
  });

  expect(wrapper.find(SampleText).length).toBe(0);
  expect(wrapper.find(ShowcasePaneHeader).length).toBe(1);
  expect(wrapper.find(FontPreview).length).toBe(0);
  expect(wrapper.find(StylesView).length).toBe(1);

  wrapper.setProps({
    textIsVisible: true,
    fontPreviewIsVisible: false,
    stylesIsVisible: false
  });

  expect(wrapper.find(SampleText).length).toBe(1);
  expect(wrapper.find(ShowcasePaneHeader).length).toBe(0);
  expect(wrapper.find(FontPreview).length).toBe(0);
  expect(wrapper.find(StylesView).length).toBe(0);
});
