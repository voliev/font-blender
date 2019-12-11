import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import css from "react-syntax-highlighter/dist/languages/hljs/css";
import docco from "react-syntax-highlighter/dist/styles/hljs/docco";
import StylesViewConnected, { StylesView } from "../StylesView";
import template from "../../../template/styles";
import state from "../../../fixtures/state";
import fonts from "../../../fixtures/fonts";
import styles from "../../../fixtures/styles";

const setup = (renderFn = shallow, propsOverrides = {}, connected = false) => {
  const props = {
    fonts,
    styles,
    ...propsOverrides
  };

  if (connected) {
    const mockStore = configureStore();
    const store = mockStore(state);

    return {
      store,
      wrapper: renderFn(
        <Provider store={store}>
          <StylesViewConnected />
        </Provider>
      )
    };
  }

  return {
    ...props,
    wrapper: renderFn(<StylesView {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const { wrapper } = setup(mount, undefined, true);

  expect(typeof wrapper.find(StylesView).prop("styles")).toBe("object");
  expect(wrapper.find(StylesView).prop("styles")).toEqual(styles);

  expect(typeof wrapper.find(StylesView).prop("fonts")).toBe("object");
  expect(wrapper.find(StylesView).prop("fonts")).toEqual(fonts);
});

it("should not update component", () => {
  const { wrapper } = setup();
  const shouldComponentUpdate = jest.spyOn(
    StylesView.prototype,
    "shouldComponentUpdate"
  );

  wrapper.instance().shouldComponentUpdate();

  expect(shouldComponentUpdate).toHaveReturnedWith(false);
});

it("should pass on corresponding props to SyntaxHighlighter component", () => {
  const { wrapper } = setup();

  expect(wrapper.find(SyntaxHighlighter).prop("language")).toBe("css");
  expect(wrapper.find(SyntaxHighlighter).prop("style")).toBe(docco);
  expect(wrapper.find(SyntaxHighlighter).prop("customStyle")).toEqual({
    whiteSpace: "pre-wrap",
    borderRadius: "6px",
    padding: "2rem"
  });
  expect(wrapper.find(SyntaxHighlighter).prop("id")).toBe("code-snippet");
  expect(wrapper.find(SyntaxHighlighter).prop("children")).toEqual(
    template(styles, fonts)
  );
});

it("should register language for syntax highlighting", () => {
  const registerLanguage = jest.spyOn(SyntaxHighlighter, "registerLanguage");

  setup();

  expect(registerLanguage).toHaveBeenCalledTimes(1);
  expect(registerLanguage).toHaveBeenCalledWith("css", css);
});
