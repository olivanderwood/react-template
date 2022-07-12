import { useForm, SubmitHandler } from "react-hook-form";
import { app } from "../../core/utils/firebase";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { useEffect, useContext, useState, useRef } from "react";

interface FormValues {
  phoneNumber: string;
}

const PhoneNumberLoginForm = ({
  visible = true,
  handleClose,
  handleLoginSubmit,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
    reset,
  } = useForm<FormValues>();
  const [result, setResult] = useState<any>(null);
  const [countdown, setCountdown] = useState<any>(5);
  const [disableSendOtp, setDisableSendOtp] = useState(false);
  const intervalRef = useRef<any>(null);
  const appVerifierRef = useRef<any>(null);
  const recaptchaWrapperRef = useRef<any>(null);
  const otpRef = useRef<any>(null);
  const [visibleInputOtp, setVisibleInputOtp] = useState<any>(false);
  const [otpError, setOtpError] = useState<any>(false);
  const onLogin = () => {
    const otp = otpRef.current.value || "";
    if (!Boolean(otp) || otp.length !== 6) {
      setOtpError(true);
      return;
    }
    result
      .confirm(otp)
      .then((res: any) => {
        handleClose(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const decrementClock = () => {
    setCountdown((countdown: any) => countdown - 1);
  };
  const onSubmit = (data: FormValues) => {
    setDisableSendOtp(true);
    setVisibleInputOtp(true);
    if (countdown === 0) setCountdown(5);

    const newString = data.phoneNumber.slice(1);
    const auth = getAuth(app);
    if (appVerifierRef.current && recaptchaWrapperRef.current) {
      appVerifierRef.current.clear();
      recaptchaWrapperRef.current.innerHTML = `<div
      id="recaptcha"
      data-sitekey="6LcsaxsdAAAAAEBn0sPDCEncnU9564MisyRuDzD_"
      data-callback="sendForm"
      data-size="invisible"
    ></div>`;
    }
    appVerifierRef.current = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
      },
      auth
    );
    // Initialize new reCaptcha verifier
    // appVerifierRef.current.verify();
    // setTimeout(() => {
    //   appVerifierRef.current.render();
    // }, 5000);
    signInWithPhoneNumber(auth, "+84" + newString, appVerifierRef.current)
      .then((confirmationResult) => {
        setResult(confirmationResult);
        setVisibleInputOtp(true);
        intervalRef.current = setInterval(() => {
          decrementClock();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (countdown === 0) {
      setDisableSendOtp(false);
      clearInterval(intervalRef.current);
    }
  }, [countdown]);
  const handleCloseForm = (e: any) => {
    if (e.target.id === "phone-login-form") {
      handleClose();
    }
  };
  return visible ? (
    <div
      className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center"
      onClick={handleCloseForm}
      id="phone-login-form"
    >
      <div className="flex items-center">
        <div className="w-96 h">
          <div ref={recaptchaWrapperRef}>
            <div
              id="recaptcha"
              data-sitekey="6LcsaxsdAAAAAEBn0sPDCEncnU9564MisyRuDzD_"
              data-callback="sendForm"
              data-size="invisible"
            ></div>
          </div>
          <div className="block bg-white shadow-lg rounded-lg p-4">
            <div className="flex items-end ">
              <input
                placeholder="Phone number"
                type="number"
                className={`${
                  (isDirty || isSubmitted) &&
                  errors.phoneNumber &&
                  "border-b-red-500"
                } block w-full py-2 text-md font-normal border-b text-gray-700 bg-white bg-clip-padding border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                {...register("phoneNumber", {
                  required: true,
                  pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                })}
              />
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={disableSendOtp}
                className={`btn btn-primary text-xs rounded-r bg-${
                  disableSendOtp ? "gray" : "orange"
                }-400 text-white p-1 ${
                  !disableSendOtp && "hover:bg-orange-500"
                } font-semibold h-full`}
              >
                Send OTP
              </button>
            </div>
            {visibleInputOtp && (
              <div className="mt-5 pt-5 border-t border-gray-300">
                <p>{countdown}</p>
                <input
                  placeholder="OTP"
                  type="number"
                  ref={otpRef}
                  className={`${
                    otpError && "border-red-500"
                  } block w-full py-2 text-md mt-4 font-normal text-gray-700 bg-white bg-clip-padding border text-center rounded border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                />
                <button
                  onClick={onLogin}
                  className="btn btn-primary text-xs rounded py-2 mt-2 w-full bg-orange-400 text-white p-1 hover:bg-orange-500 font-semibold h-full"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PhoneNumberLoginForm;
