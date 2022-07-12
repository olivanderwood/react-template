import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import NotificationInterface from "./NotificationInterface";

const ErrorNotification = forwardRef(
  (
    {
      autoDeleteTime,
      title = "Error",
      message,
      ...props
    }: NotificationInterface,
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
        className="bg-red-100 border-l-4 w-full border-red-500 absolute text-red-700 p-4 duration-300"
        style={{ right: visible ? 0 : "-100%" }}
      >
        <p className="font-bold"> {title} </p>
        <p> {message} </p>
      </div>
    );
  }
);

export default React.memo(ErrorNotification);
