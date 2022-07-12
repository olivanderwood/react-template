import { useForm, SubmitHandler } from "react-hook-form";
import { userLogin, clear } from "../../store/authentication/slice";
import { useEffect, useContext, useState, useRef } from "react";
import { useAppDispatch } from "../../store/index";
import { useSelector } from "react-redux";
import NotificationToastContext, {
  NotificationType,
} from "../../core/contexts/notification";
import { Redirect } from "react-router-dom";
import { AuthenManager } from "../../core/utils";
import { app } from "../../core/utils/firebase";
import PhoneNumberLoginForm from "./PhoneNumberLoginForm";
import axios from "axios";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
interface FormValues {
  email: string;
  password: string;
}
const Login = (...props: any) => {
  const appDispatch = useAppDispatch();
  const [phoneLoginVisible, setPhoneLoginVisible] = useState<any>(false);
  const { setViewNotification } = useContext(NotificationToastContext);
  const { from } = props.from || { from: { pathname: "/" } };
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    appDispatch(userLogin(data));
  };
  // const Kakaologin = new KakaoLogin()
  const userLoginState = useSelector((state: any) => state.authenication);

  useEffect(() => {
    if (userLoginState.loading === false && userLoginState.status === false) {
      setViewNotification("Login fail", NotificationType.Error);
      appDispatch(clear(["data", "loading", "status"]));
    } else if (
      userLoginState.loading === false &&
      userLoginState.status === true
    ) {
      setViewNotification("Login success", NotificationType.Success);
      appDispatch(clear(["loading", "status"]));
    }
  }, [userLoginState]);

  useEffect(() => {
    reset();
  }, [reset]);
  const handleClosePhoneNumberLogin = (data?: any) => {
    if (data) {
    }
    setPhoneLoginVisible(false);
  };
  if (Boolean(AuthenManager.shared().getToken()) === true) {
    return <Redirect to={from} />;
  }
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        appDispatch(userLogin({ email: "email", password: "password" }));

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const kakaoLogin = () => {
    const Kakao = window.Kakao;
    Kakao.init("09a702de273ae053ea4c2d226dd6e4c0");
    if (!Kakao.Auth.getAccessToken()) {
      console.log("Not logged in.");
    } else {
      Kakao.Auth.logout(function () {
        console.log(Kakao.Auth.getAccessToken());
      });
    }

    Kakao?.Auth.login({
      success: function (authObj: any) {
        Kakao.Auth.setAccessToken(authObj.access_token);

        Kakao.API.request({
          url: "/v2/user/me",
          data: {
            property_keys: [
              "kakao_account.email",
              "kakao_account.gender",
              "kakao_account.profile",
            ],
          },
          success: function (response: any) {
            const auth = getAuth(app);
            signInAnonymously(auth)
              .then((res) => {
                console.log(res);
                appDispatch(
                  userLogin({ email: "email", password: "password" })
                );
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);

                // ...
              });
          },
          fail: function (error: any) {
            console.log(error);
          },
        });
      },
      fail: function (err: any) {
        alert(JSON.stringify(err));
      },
    });
  };

  const naverLogin = () => {
    const naverLoginAction = new window.naver.LoginWithNaverId({
      clientId: "jyvqXeaVOVmV",
      callbackUrl: "https://localhost:3000/ssskka",
      isPopup: true,
    });
    naverLoginAction.init();
    naverLoginAction.generateAuthorizeUrl();
    // console.log(naverLoginAction.user);

    // naverLoginAction.getLoginStatus((status: any) => {
    //   console.log(status);
    // });
  };
  return (
    <section className="h-full gradient-form bg-gray-200 md:h-screen ">
      <div className=" py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-3/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap items-center justify-center py-9">
                <PhoneNumberLoginForm
                  visible={phoneLoginVisible}
                  handleClose={handleClosePhoneNumberLogin}
                />

                <form onSubmit={handleSubmit(onSubmit)} className="w-8/12">
                  <h3 className="text-3xl font-bold">Login</h3>
                  <input
                    placeholder="Email"
                    className={`${
                      (isDirty || isSubmitted) &&
                      errors.email &&
                      "border-b-red-500"
                    } form-control mt-4 block w-full py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border-b border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                    {...register("email", {
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    })}
                  />
                  {(isDirty || isSubmitted) &&
                    errors.email?.type === "required" && (
                      <p className={`text-xs text-red-500 text-left`}>
                        Email is required
                      </p>
                    )}
                  {(isDirty || isSubmitted) &&
                    errors.email?.type === "pattern" && (
                      <p className={`text-xs text-red-500 text-left`}>
                        Email is invalid
                      </p>
                    )}
                  <input
                    placeholder="Password"
                    type="password"
                    className={`${
                      (isDirty || isSubmitted) &&
                      errors.password &&
                      "border-b-red-500"
                    } form-control mt-4 block w-full py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border-b border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                    {...register("password", {
                      required: true,
                    })}
                  />
                  {(isDirty || isSubmitted) &&
                    errors.password?.type === "required" && (
                      <p className={`text-xs text-red-500 text-left`}>
                        Password is required
                      </p>
                    )}
                  <input
                    type="submit"
                    value="Login"
                    className="w-full mt-7 rounded-md duration-300 bg-purple-500 cursor-pointer tr py-3 px-4 text-md font-semibold text-white hover:bg-purple-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  />
                </form>

                <div className="w-8/12">
                  <div className="border-t border-gray-400 my-7"></div>
                  <button
                    onClick={() => {
                      setPhoneLoginVisible(true);
                    }}
                    className="w-full rounded-md duration-300 bg-cyan-500 cursor-pointer tr py-3 px-4 text-md font-semibold text-white hover:bg-cyan-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  >
                    Phone number
                  </button>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={googleLogin}
                      className="rounded-md duration-300 cursor-pointer py-3 text-md font-semibold text-white "
                    >
                      <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
                    </button>

                    <button
                      onClick={kakaoLogin}
                      className="rounded-md duration-300 cursor-pointer py-3 text-md font-semibold text-white "
                    >
                      <img src="https://img.icons8.com/color/48/000000/kakaotalk.png" />
                    </button>
                    <div id="naverIdLogin">
                      <button
                        id="naverIdLogin_loginButton"
                        onClick={naverLogin}
                        className="rounded-md duration-300 cursor-pointer py-3 text-md font-semibold text-white "
                      >
                        <img
                          src="https://blog.kakaocdn.net/dn/czMTX6/btqNbvGUwIu/xxqSeZd4eRMvTHqbfIZUd0/img.png"
                          style={{ width: 48 }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
