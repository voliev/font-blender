import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../constants";

export const addNotification = (text, group) => ({
  type: ADD_NOTIFICATION,
  text,
  group
});

export const removeNotification = group => ({
  type: REMOVE_NOTIFICATION,
  group
});
