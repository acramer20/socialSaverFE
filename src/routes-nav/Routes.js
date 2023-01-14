import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import MemberList from "../members/MemberList";
import GroupList from "../groups/GroupList";
import MemberDetail from "../members/MemberDetail";
import LoginForm from "../forms/LoginForm";
import ProfileForm from "../profiles/ProfileFormSs";
import CreateGroupForm from "../forms/CreateGroupForm";
import SignupForm from "../forms/SignupForm";
import PrivateRoute from "./PrivateRoute";
import GroupMembers from "../groups/GroupMembers";
import GroupDetails from "../groups/GroupDetails";
import UpdateGroupForm from "../forms/UpdateGroupForm";

/** Sitewide routes. PArts of site should only be visible when the user is logged in or has just signed up. 
 */

function Routes({ login, signup, createGroup }) {
  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );

  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>

          <PrivateRoute exact path="/members">
            <MemberList />
          </PrivateRoute>

          <PrivateRoute exact path="/createGroup">
            <CreateGroupForm createGroup={createGroup} />
          </PrivateRoute>

          <PrivateRoute exact path="/groups">
            <GroupList />
          </PrivateRoute>

          <PrivateRoute exact path="/groups/:id">
            <GroupDetails />
          </PrivateRoute>

          <PrivateRoute exact path="/updateGroup/:id">
            <UpdateGroupForm  />
          </PrivateRoute>

          <PrivateRoute exact path="/groups/:id/members">
            <GroupMembers/>
          </PrivateRoute>

          <PrivateRoute exact path="/members/:id">
            <MemberDetail />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <ProfileForm />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
