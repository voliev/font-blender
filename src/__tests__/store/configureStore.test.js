import * as redux from "redux";
import thunk from "redux-thunk";
import fonts from "../../reducers/fonts";
import filters from "../../reducers/filters";
import selectedFonts from "../../reducers/selectedFonts";
import showcase from "../../reducers/showcase";
import styles from "../../reducers/styles";
import notifications from "../../reducers/notifications";
import configureStore from "../../store/configureStore";

it("should return object", () => {
  const store = configureStore();

  expect(store).toEqual(expect.any(Object));
  expect(store).toEqual(
    expect.objectContaining({
      dispatch: expect.any(Function),
      getState: expect.any(Function),
      replaceReducer: expect.any(Function),
      subscribe: expect.any(Function)
    })
  );
});

it("should call `createStore`", () => {
  const createStore = jest.spyOn(redux, "createStore");

  configureStore();

  expect(createStore).toHaveBeenCalledTimes(1);
});

it("should call `combineReducers`", () => {
  const combineReducers = jest.spyOn(redux, "combineReducers");

  configureStore();

  expect(combineReducers).toHaveBeenCalledTimes(1);
  expect(combineReducers).toHaveBeenCalledWith({
    fonts,
    filters,
    selectedFonts,
    showcase,
    styles,
    notifications
  });
});

it("should call `applyMiddleware`", () => {
  const applyMiddleware = jest.spyOn(redux, "applyMiddleware");

  configureStore();

  expect(applyMiddleware).toHaveBeenCalledTimes(1);
  expect(applyMiddleware).toHaveBeenCalledWith(thunk);
});
