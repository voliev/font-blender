import {
  addNotification,
  removeNotification
} from "../../actions/notifications";
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../../constants";

it("should generate new notification action object", () => {
  const text = "Copied to clipboard";
  const group = "clipboard";
  const action = addNotification(text, group);

  expect(action).toEqual({
    type: ADD_NOTIFICATION,
    text,
    group
  });
});

it("should generate action object for notification removal", () => {
  const group = "clipboard";
  const action = removeNotification(group);

  expect(action).toEqual({
    type: REMOVE_NOTIFICATION,
    group
  });
});
