import React from "react";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import VisibilitySensor from "react-visibility-sensor";
import VisibleFonts from "../VisibleFonts";
import FontItem from "../FontItem";
import state from "../../../fixtures/state";
import visibleFonts from "../../../fixtures/visibleFonts";

const setup = (
  renderFn = shallow,
  propsOverrides = {},
  provideStore = false
) => {
  const props = {
    visibleFonts,
    adjustBundleSize: jest.fn(),
    ...propsOverrides
  };

  if (provideStore) {
    const mockStore = configureStore();
    const store = mockStore(state);

    return {
      ...props,
      wrapper: renderFn(
        <Provider store={store}>
          <VisibleFonts {...props} />
        </Provider>
      )
    };
  }

  return {
    ...props,
    wrapper: renderFn(<VisibleFonts {...props} />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  // NOTE: Snapshot test case is irrelevant since `shallow` doesn't
  //       support ref. Without it the component will be rendered with
  //       empty list. `Mount` supports refs but creates useless
  //       huge snapshot even with one element.
});

it("should not crash if visibleFonts array is empty", () => {
  const { wrapper } = setup(mount, { visibleFonts: [] }, true);

  expect(wrapper).toMatchSnapshot();
});

it("should render corresponding message when the list is empty", () => {
  const { wrapper } = setup(mount, { visibleFonts: [] }, true);

  expect(wrapper.find("li").length).toBe(1);
  expect(wrapper.find("li").hasClass("no-matches")).toBeTruthy();
  expect(wrapper.find("li").text()).toBe("No matches found...");
});

it("should receive corresponding props", () => {
  const { wrapper, adjustBundleSize, visibleFonts } = setup(
    mount,
    undefined,
    true
  );

  expect(typeof wrapper.find(VisibleFonts).prop("adjustBundleSize")).toBe(
    "function"
  );
  expect(wrapper.find(VisibleFonts).prop("adjustBundleSize")).toBe(
    adjustBundleSize
  );
  expect(typeof wrapper.find(VisibleFonts).prop("visibleFonts")).toBe("object");
  expect(
    wrapper
      .find(VisibleFonts)
      .prop("visibleFonts")
      .hasOwnProperty("length")
  ).toBeTruthy();
  expect(wrapper.find(VisibleFonts).prop("visibleFonts")).toEqual(visibleFonts);
});

it("should trigger componentDidMount after initial render", () => {
  const componentDidMount = jest.spyOn(
    VisibleFonts.prototype,
    "componentDidMount"
  );

  setup(mount, undefined, true);

  expect(componentDidMount).toHaveBeenCalled();
});

it("should update state after initial render", () => {
  const { wrapper } = setup(mount, undefined, true);
  const containment = wrapper.find(VisibleFonts).state("containment");

  expect(containment).not.toBe("");
  expect(typeof containment).toBe("object");
  expect(containment.nodeType).toBe(1);
  expect(containment.tagName).toBe("UL");
  expect(containment.constructor).toBe(HTMLUListElement);
});

it("should set corresponding class if the list is empty", () => {
  const { wrapper } = setup(shallow, { visibleFonts: [] });

  expect(wrapper.find("ul").hasClass("empty")).toBeTruthy();
  wrapper.setProps({ visibleFonts });
  expect(wrapper.find("ul").hasClass("empty")).toBeFalsy();
});

it("should wrap corresponding fonts in VisibilitySensor component", () => {
  const { wrapper } = setup(mount, undefined, true);

  const items = wrapper.find(VisibilitySensor);

  expect(items.length).toBeGreaterThan(0);

  items.forEach(node => {
    expect(node.find(FontItem).prop("font").requested).toBeFalsy();
  });
});

it("should pass on corresponding props to VisibilitySensor component", () => {
  const { wrapper, adjustBundleSize } = setup(mount, undefined, true);

  const containment = wrapper.find(VisibleFonts).state("containment");

  const items = wrapper.find(VisibilitySensor);

  items.forEach((node, idx) => {
    expect(node.prop("containment")).toEqual(containment);
    expect(node.prop("scrollCheck")).toBeTruthy();
    expect(node.prop("scrollDelay")).toBe(1000);
    expect(node.prop("intervalDelay")).toBe(200);
    expect(node.prop("partialVisibility")).toBeTruthy();

    // onChange handler should be set only on the last item
    // to extend list length update
    if (idx === items.length - 1) {
      expect(node.prop("onChange")).toBe(adjustBundleSize);
    } else {
      expect(node.prop("onChange")).toBe(null);
    }
  });
});

it("should not wrap requested fonts in VisibilitySensor component", () => {
  const { wrapper } = setup(mount, undefined, true);

  const items = wrapper
    .find(FontItem)
    .filterWhere(node => node.prop("font").requested);

  items.forEach(node => {
    expect(node.find(VisibilitySensor).length).toBe(0);
  });
});
