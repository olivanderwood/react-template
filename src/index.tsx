import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./contents";
import store from "./store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { Loader, Notifications } from "./core/components";
import LoaderContext from "./core/contexts/loader/useLoader";
import NotificationToastContext, {
  NotificationType,
} from "./core/contexts/notification";
import { useState, useRef } from "react";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  const [loading, setLoading] = useState<any>(false);
  const [message, setMessage] = useState<any>("");
  const successNotificationRef = useRef<any>(null);
  const errorNotificationRef = useRef<any>(null);
  const warningNotificationRef = useRef<any>(null);

  const setViewNotification = (message: string, type: string) => {
    setMessage(message);
    if (type === NotificationType.Error) {
      errorNotificationRef?.current.setToastVisible(true);
    } else if (type === NotificationType.Warning) {
      warningNotificationRef?.current.setToastVisible(true);
    } else if (type === NotificationType.Success) {
      successNotificationRef?.current.setToastVisible(true);
    }
  };
  return (
    <LoaderContext.Provider value={{ setLoading }}>
      <NotificationToastContext.Provider value={{ setViewNotification }}>
        <Loader visible={loading} />
        <div className="absolute top-0 right-0 w-3/12 z-10 bg-red-500">
          <Notifications.Success
            ref={successNotificationRef}
            message={message}
            autoDeleteTime={1500}
          />
          <Notifications.Error
            ref={errorNotificationRef}
            message={message}
            autoDeleteTime={1500}
          />
          <Notifications.Warning
            ref={warningNotificationRef}
            message={message}
            autoDeleteTime={1500}
          />
        </div>
        <Routes />
      </NotificationToastContext.Provider>
    </LoaderContext.Provider>
  );
};
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
