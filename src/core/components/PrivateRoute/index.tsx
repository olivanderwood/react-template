import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthenManager } from "../../utils";

const PrivateRoute = ({ ...routeProps }: RouteProps) => {
  const isAuthenticated = AuthenManager.shared().getToken();
  if (Boolean(isAuthenticated)) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/login" />;
};

export default PrivateRoute;
