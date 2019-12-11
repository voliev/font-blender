import notificationsReducer from "../../reducers/notifications";
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../../constants";
import notifications from "../../fixtures/notifications";

it("should set default state", () => {
  const state = notificationsReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual(notifications);
});

it("should add new notification", () => {
  let state = notificationsReducer(notifications, {
    type: ADD_NOTIFICATION,
    group: "selectedFonts",
    text: "Roboto font family has been removed"
  });

  expect(state).toEqual({
    ...notifications,
    selectedFonts: {
      current: "Roboto font family has been removed",
      pending: ""
    }
  });

  state = notificationsReducer(state, {
    type: ADD_NOTIFICATION,
    group: "selectedFonts",
    text: "Lato font family has been removed"
  });

  expect(state).toEqual({
    ...notifications,
    selectedFonts: {
      current: "Roboto font family has been removed",
      pending: "Lato font family has been removed"
    }
  });

  state = notificationsReducer(state, {
    type: ADD_NOTIFICATION,
    group: "selectedFonts",
    text: "3 font families have been removed"
  });

  expect(state).toEqual({
    ...notifications,
    selectedFonts: {
      current: "Lato font family has been removed",
      pending: "3 font families have been removed"
    }
  });
});

it("should remove notification", () => {
  let state = notificationsReducer(notifications, {
    type: ADD_NOTIFICATION,
    group: "selectedFonts",
    text: "Roboto font family has been removed"
  });

  expect(state).toEqual({
    ...notifications,
    selectedFonts: {
      current: "Roboto font family has been removed",
      pending: ""
    }
  });

  state = notificationsReducer(state, {
    type: ADD_NOTIFICATION,
    group: "selectedFonts",
    text: "Lato font family has been removed"
  });

  expect(state).toEqual({
    ...notifications,
    selectedFonts: {
      current: "Roboto font family has been removed",
      pending: "Lato font family has been removed"
    }
  });

  state = notificationsReducer(state, {
    type: REMOVE_NOTIFICATION,
    group: "selectedFonts"
  });

  expect(state).toEqual({
    ...notifications,
    selectedFonts: {
      current: "Lato font family has been removed",
      pending: ""
    }
  });

  state = notificationsReducer(state, {
    type: REMOVE_NOTIFICATION,
    group: "selectedFonts"
  });

  expect(state).toEqual({
    ...notifications,
    selectedFonts: {
      current: "",
      pending: ""
    }
  });
});
