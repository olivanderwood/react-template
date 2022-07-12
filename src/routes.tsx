import { BrowserRouter, Switch, Route } from "react-router-dom";

import Contents from "./contents";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Contents />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
