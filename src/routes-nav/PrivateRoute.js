import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../forms/UserContext";

/** "Higher-Order Component" for private routes to check if there is a current user... otherwise, they cannot view the certain routes.
 */

function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  console.debug(
      "PrivateRoute",
      "exact=", exact,
      "path=", path,
      "currentUser=", currentUser,
  );

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
  );
}

export default PrivateRoute;
