import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import NotificationSnackbarConnected, {
  NotificationSnackbar
} from "../NotificationSnackbar";
import UndoButton from "../UndoButton";
import selectedFonts from "../../../fixtures/selectedFonts";
import state from "../../../fixtures/state";
import { TIMEOUT } from "../../../constants";

const setup = (renderFn = shallow, propsOverrides = {}, connected = false) => {
  const props = {
    notification: {
      current: "Roboto font family has been removed",
      pending: ""
    },
    group: "selectedFonts",
    groupState:
      propsOverrides.group !== "clipboard" ? selectedFonts : undefined,
    removeNotification: jest.fn(),
    undoActionHandler:
      propsOverrides.group !== "clipboard" ? jest.fn() : undefined,
    ...propsOverrides
  };

  if (connected) {
    const mockStore = configureStore();
    const store = mockStore(state);

    return {
      ...props,
      wrapper: renderFn(
        <NotificationSnackbarConnected {...props} store={store} />
      )
    };
  }

  return {
    ...props,
    wrapper: renderFn(<NotificationSnackbar {...props} />)
  };
};

afterEach(() => {
  jest.clearAllMocks();
});

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const {
    wrapper,
    notification,
    removeNotification,
    undoActionHandler,
    groupState
  } = setup(mount, undefined, true);
  const component = wrapper.find(NotificationSnackbar);

  expect(typeof component.prop("notification")).toBe("object");
  expect(component.prop("notification")).toEqual(notification);

  expect(typeof component.prop("group")).toBe("string");
  expect(component.prop("group")).toBe("selectedFonts");

  expect(typeof component.prop("removeNotification")).toBe("function");
  expect(component.prop("removeNotification")).toBe(removeNotification);

  expect(typeof component.prop("undoActionHandler")).toBe("function");
  expect(component.prop("undoActionHandler")).toBe(undoActionHandler);

  expect(typeof component.prop("groupState")).toBe("object");
  expect(component.prop("groupState").hasOwnProperty("length")).toBeTruthy();
  expect(component.prop("groupState")).toEqual(groupState);
});

it("should receive corresponding props", () => {
  const { wrapper, notification, removeNotification } = setup(
    mount,
    {
      notification: {
        current: "Copied to clipboard",
        pending: ""
      },
      group: "clipboard"
    },
    true
  );

  const component = wrapper.find(NotificationSnackbar);

  expect(typeof component.prop("notification")).toBe("object");
  expect(component.prop("notification")).toEqual(notification);

  expect(typeof component.prop("group")).toBe("string");
  expect(component.prop("group")).toBe("clipboard");

  expect(typeof component.prop("removeNotification")).toBe("function");
  expect(component.prop("removeNotification")).toBe(removeNotification);

  expect(component.prop("undoActionHandler")).toBeUndefined();

  expect(component.prop("groupState")).toBeUndefined();
});

it("should set corresponding state", () => {
  const { wrapper } = setup();

  expect(wrapper.state("stage")).toBe("elevate");
  expect(wrapper.state("timerId")).toBeUndefined();
});

it("should set corresponding component classes", () => {
  const { wrapper } = setup();

  expect(wrapper.hasClass("NotificationSnackbar")).toBeTruthy();
  expect(wrapper.hasClass("elevate")).toBeTruthy();
  expect(wrapper.hasClass("display")).toBeFalsy();
  expect(wrapper.hasClass("drop")).toBeFalsy();
  expect(wrapper.hasClass("undo")).toBeFalsy();

  wrapper.setState({
    stage: "display",
    timeId: 12345
  });

  expect(wrapper.hasClass("NotificationSnackbar")).toBeTruthy();
  expect(wrapper.hasClass("elevate")).toBeFalsy();
  expect(wrapper.hasClass("display")).toBeTruthy();
  expect(wrapper.hasClass("drop")).toBeFalsy();
  expect(wrapper.hasClass("undo")).toBeFalsy();

  wrapper.setState({
    stage: "drop",
    timeId: undefined
  });

  expect(wrapper.hasClass("NotificationSnackbar")).toBeTruthy();
  expect(wrapper.hasClass("elevate")).toBeFalsy();
  expect(wrapper.hasClass("display")).toBeFalsy();
  expect(wrapper.hasClass("drop")).toBeTruthy();
  expect(wrapper.hasClass("undo")).toBeFalsy();

  wrapper.setState({
    stage: "undo",
    timeId: undefined
  });

  expect(wrapper.hasClass("NotificationSnackbar")).toBeTruthy();
  expect(wrapper.hasClass("elevate")).toBeFalsy();
  expect(wrapper.hasClass("display")).toBeFalsy();
  expect(wrapper.hasClass("drop")).toBeFalsy();
  expect(wrapper.hasClass("undo")).toBeTruthy();
});

it("should render `undo` button", () => {
  const { wrapper, undoActionHandler } = setup(mount, undefined, true);

  expect(wrapper.find(NotificationSnackbar).prop("undoActionHandler")).toBe(
    undoActionHandler
  );
  expect(wrapper.find(UndoButton).length).toBe(1);
});

it("should NOT render `undo` button", () => {
  const { wrapper } = setup(
    mount,
    {
      notification: {
        current: "Copied to clipboard",
        pending: ""
      },
      group: "clipboard"
    },
    true
  );

  expect(wrapper.find(UndoButton).length).toBe(0);
});

it("should set a timer when a snackbar has been elevated", () => {
  const setTimer = jest.spyOn(NotificationSnackbar.prototype, "setTimer");
  const { wrapper } = setup();

  wrapper.instance().handleAnimationEnd();

  expect(setTimer).toHaveBeenCalledTimes(1);
  expect(wrapper.state("stage")).toBe("display");
  expect(wrapper.state("timerId")).toBeDefined();
});

it("should clear timer after display timeout", () => {
  jest.useFakeTimers();
  const setTimer = jest.spyOn(NotificationSnackbar.prototype, "setTimer");
  const clearTimer = jest.spyOn(NotificationSnackbar.prototype, "clearTimer");
  const { wrapper } = setup();

  expect(wrapper.state("stage")).toBe("elevate");
  expect(wrapper.state("timerId")).toBeUndefined();

  wrapper.instance().handleAnimationEnd();

  expect(setTimer).toHaveBeenCalledTimes(1);
  expect(wrapper.state("stage")).toBe("display");
  expect(wrapper.state("timerId")).toBeDefined();
  expect(clearTimer).toHaveBeenCalledTimes(0);

  jest.runTimersToTime(TIMEOUT);

  expect(clearTimer).toHaveBeenCalledTimes(1);
  expect(wrapper.state("stage")).toBe("drop");
  expect(wrapper.state("timerId")).toBeUndefined();
});

it("should remove notification on `drop` stage", () => {
  const { wrapper, removeNotification } = setup();

  wrapper.setState({ stage: "drop" });
  wrapper.instance().handleAnimationEnd();

  expect(removeNotification).toHaveBeenCalledTimes(1);
  expect(removeNotification).toHaveBeenCalledWith("selectedFonts");
});

it("should handle `undo` button click", () => {
  const { wrapper } = setup();

  wrapper.setState({
    stage: "display",
    timeId: 123
  });
  wrapper.instance().handleUndoButtonClick();

  expect(wrapper.state("stage")).toBe("undo");
  expect(wrapper.state("timerId")).toBeUndefined();
});

it("should call undoActionHandler on `undo` stage", () => {
  const { wrapper, undoActionHandler } = setup();

  wrapper.setState({ stage: "undo" });
  wrapper.instance().handleAnimationEnd();

  expect(undoActionHandler).toHaveBeenCalledTimes(1);
});

it("should handle `close` icon click", () => {
  const handleCloseIconClick = jest.spyOn(
    NotificationSnackbar.prototype,
    "handleCloseIconClick"
  );
  const clearTimer = jest.spyOn(NotificationSnackbar.prototype, "clearTimer");
  const { wrapper } = setup();

  wrapper.find(".close-icon").simulate("click");

  expect(handleCloseIconClick).toHaveBeenCalledTimes(1);
  expect(clearTimer).toHaveBeenCalledTimes(1);
  expect(clearTimer).toHaveBeenCalledWith("drop");
  expect(wrapper.state("stage")).toBe("drop");
  expect(wrapper.state("timerId")).toBeUndefined();
});

it("should clear timer on pending notification", () => {
  const { wrapper, notification } = setup();

  wrapper.setState({
    stage: "display",
    timerId: 123
  });

  expect(wrapper.state("timerId")).toBe(123);

  wrapper.setProps({
    groupState: selectedFonts.slice(1),
    notification: {
      ...notification,
      pending: "Lato font family has been removed"
    }
  });

  expect(wrapper.state("timerId")).toBeUndefined();
});

it("should clear timer on group state change", () => {
  const clearTimer = jest.spyOn(NotificationSnackbar.prototype, "clearTimer");
  const { wrapper } = setup();

  wrapper.setState({
    stage: "display",
    timerId: 123
  });

  expect(wrapper.state("timerId")).toBe(123);

  wrapper.setProps({
    groupState: [...selectedFonts, "Roboto"]
  });

  expect(clearTimer).toHaveBeenCalledTimes(1);
  expect(clearTimer).toHaveBeenCalledWith("drop");
  expect(wrapper.state("timerId")).toBeUndefined();
});

it("should NOT clear timer and drop notification", () => {
  const clearTimer = jest.spyOn(NotificationSnackbar.prototype, "clearTimer");
  const { wrapper } = setup(shallow, {
    notification: {
      current: "Copied to clipboard",
      pending: ""
    },
    group: "clipboard"
  });

  wrapper.instance().componentDidUpdate();

  expect(clearTimer).not.toHaveBeenCalled();
});
