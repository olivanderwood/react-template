import { Route, Switch, BrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./core/components";
import { Suspense } from "react";
import pages from "./pages/index";

const Contents = () => {
  return (
    <BrowserRouter>
      <Switch>
        {pages.map(
          ({ component: Component, path, ...rest }: any, index: number) => {
            return rest.public ? (
              <Route path={path} component={Component} {...rest} key={index} />
            ) : (
              <PrivateRoute
                path={path}
                component={Component}
                {...rest}
                key={index}
              />
            );
          }
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Contents;
