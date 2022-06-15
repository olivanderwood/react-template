import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  Login,
  // PageNotFound,
} from "./pages";
import Contents from "./contents";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Contents />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
