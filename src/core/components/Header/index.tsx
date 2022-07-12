import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { clear } from "../../../store/authentication/slice";
import { Link } from "react-router-dom";
import NotificationToastContext, {
  NotificationType,
} from "../../contexts/notification";
const Header = () => {
  const dispatch = useDispatch();
  const { setViewNotification } = useContext(NotificationToastContext);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const logout = () => {
    setViewNotification("Logout success", NotificationType.Success);
    dispatch(clear(["data", "loading", "status"]));
  };

  return (
    <div className="w-full h-16">
      <div className="fixed w-full">
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-slate-500 mb-3">
          <div className="md:container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              <Link
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                to="/"
              >
                slate Tailwind Starter Kit
              </Link>
              <button
                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <div
              className={
                "lg:flex flex-grow items-center justify-between lg:justify-start lg:ml-auto" +
                (navbarOpen ? " flex" : " hidden")
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <Link
                    to="/management"
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                    <i className="fas fa-tasks text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Management</span>
                  </Link>
                </li>
              </ul>
              <div className="flex lg:flex-row flex-col w-auto ml-5 items-center h-full">
                <div className="flex w-auto">
                  <img
                    src="https://i.pinimg.com/736x/69/80/79/6980790004c4312ebf807b0b301813fa.jpg"
                    alt=""
                    className="rounded-full w-12 h-12"
                  />
                  <div className="flex flex-col items-start ml-2">
                    <p className="text-white text-lg font-bold">Híu</p>
                    <p className="text-white text-xs font-semibold">
                      Đang gất nà bùn ngủ
                    </p>
                  </div>
                </div>
                <div
                  className="text-right align-middle ml-5 cursor-pointer"
                  onClick={logout}
                >
                  <i className="fas fa-sign-out-alt text-white text-2xl cursor:pointer"></i>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
