import { Switch } from "react-router-dom";
import { PrivateRoute } from "./core/components";

import { Home } from "./pages";

const Contents = () => {
  return (
    <Switch>
      <PrivateRoute path="/" component={Home} exact={true} />
    </Switch>
  );
};

export default Contents;
