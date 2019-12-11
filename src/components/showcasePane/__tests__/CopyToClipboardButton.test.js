import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import Clipboard from "clipboard";
import Copy from "@material-ui/icons/FileCopyOutlined";
import CopyToClipboardButtonConnected, {
  CopyToClipboardButton
} from "../CopyToClipboardButton";
import { ADD_NOTIFICATION } from "../../../constants";
import state from "../../../fixtures/state";

const setup = (renderFn = shallow, propsOverrides = {}, connected = false) => {
  const props = {
    addNotification: jest.fn(),
    notificationActive: false,
    target: "code-snippet",
    ...propsOverrides
  };

  if (connected) {
    const mockStore = configureStore();
    const store = mockStore(state);

    return {
      store,
      wrapper: renderFn(
        <CopyToClipboardButtonConnected store={store} target={props.target} />
      )
    };
  }

  return {
    ...props,
    wrapper: renderFn(<CopyToClipboardButton {...props} />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should set corresponding target", () => {
  const { wrapper } = setup();

  expect(wrapper.find("button").prop("data-clipboard-target")).toBe(
    "#code-snippet"
  );
});

it("should set corresponding icon", () => {
  const { wrapper } = setup();

  expect(wrapper.find(Copy).length).toBe(1);
  expect(wrapper.find(Copy).prop("fontSize")).toBe("small");
});

it("should create new Clipboard instance", () => {
  const { wrapper } = setup();

  expect(wrapper.instance().clipboard).toBeInstanceOf(Clipboard);
});

it("should remove Clipboard object instance on unmount", () => {
  const { wrapper } = setup();
  const destroy = jest.spyOn(Clipboard.prototype, "destroy");

  expect(wrapper.instance().clipboard).toBeInstanceOf(Clipboard);

  wrapper.unmount();

  expect(destroy).toHaveBeenCalledTimes(1);
});

it("should clear selection on clipboard `copy` event", () => {
  const clearSelection = jest.fn();
  const { wrapper } = setup();

  wrapper.instance().handleCopySuccess({ clearSelection });

  expect(clearSelection).toHaveBeenCalledTimes(1);
});

it("should add new notification", () => {
  const { wrapper, addNotification } = setup();

  wrapper.instance().handleCopySuccess({ clearSelection: jest.fn() });

  expect(addNotification).toHaveBeenCalledTimes(1);
  expect(addNotification).toHaveBeenLastCalledWith("Copied to clipboard");

  wrapper.instance().handleCopyError();

  expect(addNotification).toHaveBeenCalledTimes(2);
  expect(addNotification).toHaveBeenLastCalledWith(
    "Unable to copy to clipboard"
  );

  wrapper.setProps({ notificationActive: true });

  wrapper.instance().handleCopySuccess({ clearSelection: jest.fn() });

  expect(addNotification).toHaveBeenCalledTimes(2);

  wrapper.instance().handleCopyError();

  expect(addNotification).toHaveBeenCalledTimes(2);
});

it("should dispatch an action", () => {
  const { wrapper, store } = setup(shallow, undefined, true);

  wrapper.prop("addNotification")("Copied to clipboard");

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: ADD_NOTIFICATION,
    text: "Copied to clipboard",
    group: "clipboard"
  });
});
