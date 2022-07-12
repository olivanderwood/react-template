import { createContext, Dispatch, SetStateAction } from "react";

export enum NotificationType {
  Success = "Success",
  Error = "Error",
  Warning = "Warning",
}

export interface NotificationToastContextInterface {
  setViewNotification: (message: string, type: string) => void;
}
export const defaultNotificationContext = {
  setViewNotification: () => {},
};

const NotificationToastContext =
  createContext<NotificationToastContextInterface>(defaultNotificationContext);

export default NotificationToastContext;
