import React from "react";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import NotificationsConnected, { Notifications } from "../Notifications";
import NotificationSnackbar from "../NotificationSnackbar";
import {
  REMOVE_NOTIFICATION,
  UNDO_DESELECTED,
  UNDO_RESET
} from "../../../constants";
import notifications from "../../../fixtures/notifications";
import state from "../../../fixtures/state";

const setup = (
  renderFn = shallow,
  propsOverrides = {},
  connected = false,
  provideStore = false
) => {
  const props = {
    notifications: {
      ...notifications,
      selectedFonts: {
        ...notifications.selectedFonts,
        current: "Roboto font family has been removed"
      },
      styles: {
        ...notifications.styles,
        current: "Styles has been reset"
      }
    },
    removeNotification: jest.fn(),
    selectedFonts: jest.fn(),
    styles: jest.fn(),
    ...propsOverrides
  };

  if (connected || provideStore) {
    const mockStore = configureStore([thunk]);
    const store = mockStore(state);

    return {
      ...props,
      store,
      wrapper: connected
        ? renderFn(<NotificationsConnected store={store} />)
        : renderFn(
            <Provider store={store}>
              <Notifications {...props} />
            </Provider>
          )
    };
  }

  return {
    ...props,
    wrapper: renderFn(<Notifications {...props} />)
  };
};

it("should render without crashing", () => {
  const { wrapper } = setup();

  expect(wrapper).toMatchSnapshot();
});

it("should receive corresponding props", () => {
  const {
    notifications,
    removeNotification,
    selectedFonts,
    styles,
    wrapper
  } = setup(mount, undefined, false, true);

  expect(typeof wrapper.find(Notifications).prop("notifications")).toBe(
    "object"
  );
  expect(wrapper.find(Notifications).prop("notifications")).toEqual(
    notifications
  );

  expect(typeof wrapper.find(Notifications).prop("removeNotification")).toBe(
    "function"
  );
  expect(wrapper.find(Notifications).prop("removeNotification")).toEqual(
    removeNotification
  );

  expect(typeof wrapper.find(Notifications).prop("selectedFonts")).toBe(
    "function"
  );
  expect(wrapper.find(Notifications).prop("selectedFonts")).toEqual(
    selectedFonts
  );

  expect(typeof wrapper.find(Notifications).prop("styles")).toBe("function");
  expect(wrapper.find(Notifications).prop("styles")).toEqual(styles);
});

it("should render notification snackbar if there are no notifications", () => {
  const { wrapper } = setup(shallow, { notifications });

  expect(wrapper.find(NotificationSnackbar).length).toBe(0);
});

it("should render notification snackbar if there are current notifications", () => {
  const { wrapper } = setup();

  expect(wrapper.find(NotificationSnackbar).length).toBe(2);
});

it("should dispatch actions", () => {
  const { wrapper, store } = setup(shallow, undefined, true);

  wrapper.prop("selectedFonts")();

  expect(store.getActions()).toContainEqual({
    type: UNDO_DESELECTED
  });
  expect(store.getActions()).toContainEqual({
    type: REMOVE_NOTIFICATION,
    group: "selectedFonts"
  });

  store.clearActions();

  expect(store.getActions()).toEqual([]);

  wrapper.prop("styles")();

  expect(store.getActions()).toContainEqual({
    type: UNDO_RESET
  });
  expect(store.getActions()).toContainEqual({
    type: REMOVE_NOTIFICATION,
    group: "styles"
  });

  store.clearActions();

  expect(store.getActions()).toEqual([]);

  wrapper.prop("removeNotification")("styles");

  expect(store.getActions()).toContainEqual({
    type: REMOVE_NOTIFICATION,
    group: "styles"
  });
});
