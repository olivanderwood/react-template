import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import NotificationInterface from "./NotificationInterface";

const SuccessNotification = forwardRef(
  (
    { autoDeleteTime, title = "Success", message }: NotificationInterface,
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      setToastVisible(data: boolean) {
        setVisible(data);
      },
    }));

    useEffect(() => {
      if (visible) {
        const interval = setInterval(() => {
          setVisible(false);
        }, autoDeleteTime);
        return () => {
          clearInterval(interval);
        };
      }
    }, [visible]);

    return (
      <div
        className="bg-green-100 border-l-4 w-full border-green-500 absolute text-green-700 p-4 duration-300"
        style={{ right: visible ? 0 : "-100%" }}
        role="alert"
      >
        <p className="font-bold">{title}</p>
        <p>{message}</p>
      </div>
    );
  }
);

export default SuccessNotification;
