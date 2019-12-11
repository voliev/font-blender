import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import ElementsConnected, { Elements } from "../Elements";
import { getSelectedFonts } from "../../../reducers/selectedFonts";
import { SET_STYLES_INHERITANCE } from "../../../constants";
import state from "../../../fixtures/state";
import textStyles from "../../../fixtures/textStyles";

const setup = (
  renderFn = shallow,
  propsOverrides = {},
  provideStore = false
) => {
  const props = {
    disabled: false,
    selectedFonts: getSelectedFonts(state),
    textStyles: textStyles,
    setStylesInheritance: jest.fn(),
    ...propsOverrides
  };

  if (provideStore) {
    const mockStore = configureStore();
    const store = mockStore(state);

    return {
      store,
      wrapper: renderFn(
        <Provider store={store}>
          <ElementsConnected />
        </Provider>
      )
    };
  }

  return {
    ...props,
    wrapper: renderFn(<Elements {...props} />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const wrapper = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should dispatch an action on style inheritance change", () => {
  const { wrapper, store } = setup(mount, {}, true);

  wrapper
    .find("Elements")
    .instance()
    .handleStylesInheritanceChange({
      target: { value: "h1" }
    });

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: SET_STYLES_INHERITANCE,
    element: "h1"
  });
});

it("should update component on props change", () => {
  const { wrapper, disabled, selectedFonts, textStyles } = setup();
  const shouldComponentUpdate = jest.spyOn(
    Elements.prototype,
    "shouldComponentUpdate"
  );

  const currProps = { disabled, selectedFonts, textStyles };
  const nextProps = {
    disabled: true,
    selectedFonts: {},
    textStyles: {
      ...textStyles,
      body: {
        ...textStyles.body,
        fontFamily: "Roboto"
      }
    }
  };

  for (let prop in currProps) {
    wrapper.setProps({ [prop]: nextProps[prop] });

    expect(wrapper.instance().props[prop]).toEqual(nextProps[prop]);
    expect(shouldComponentUpdate).toHaveLastReturnedWith(true);
  }
});

it("should not update component on props change", () => {
  const { wrapper } = setup();
  const shouldComponentUpdate = jest.spyOn(
    Elements.prototype,
    "shouldComponentUpdate"
  );

  wrapper.setProps({ setStylesInheritance: jest.fn() });

  expect(shouldComponentUpdate).toHaveBeenCalledTimes(1);
  expect(shouldComponentUpdate).toHaveLastReturnedWith(false);
});
