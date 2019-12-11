import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  setDefaultStyles,
  undoReset,
  startSetDefaultStyles,
  startUndoReset
} from "../../actions/styles";
import * as notifications from "../../actions/notifications";
import {
  SET_DEFAULT_STATE,
  UNDO_RESET,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from "../../constants";

const setup = () => {
  const mockStore = configureStore([thunk]);

  return {
    store: mockStore({}),
    addNotification: jest.spyOn(notifications, "addNotification"),
    removeNotification: jest.spyOn(notifications, "removeNotification")
  };
};

it("should generate action object to set default styles", () => {
  const action = setDefaultStyles();

  expect(action).toEqual({
    type: SET_DEFAULT_STATE
  });
});

it("should generate action object to undo reset styles", () => {
  const action = undoReset();

  expect(action).toEqual({
    type: UNDO_RESET
  });
});

it("should generate action object to reset styles and add notification", () => {
  const { addNotification, store } = setup();

  store.dispatch(startSetDefaultStyles());

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: SET_DEFAULT_STATE
  });

  expect(addNotification).toHaveBeenCalledTimes(1);
  expect(addNotification).toHaveBeenCalledWith(
    "Styles has been reset",
    "styles"
  );
  expect(actions).toContainEqual({
    type: ADD_NOTIFICATION,
    text: "Styles has been reset",
    group: "styles"
  });
});

it("should generate action object to undo reset styles and remove notification", () => {
  const { removeNotification, store } = setup();

  store.dispatch(startUndoReset());

  const actions = store.getActions();

  expect(actions).toContainEqual({
    type: UNDO_RESET
  });

  expect(removeNotification).toHaveBeenCalledTimes(1);
  expect(removeNotification).toHaveBeenCalledWith("styles");
  expect(actions).toContainEqual({
    type: REMOVE_NOTIFICATION,
    group: "styles"
  });
});
