import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../forms/UserContext";

/** Homepage of Social Saver with a cute little welcome message
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
        <div className="container text-center">
          <h1 className="mb-8 font-weight-bold">Social Saver</h1>
          <p className="lead home-para">Because if you tried it alone, you probably would spend it all on pizza or something.</p>
          {currentUser
              ? <h2>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h2>
              : (
                  <p>
                    <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                      Sign up
                    </Link>
                  </p>
              )}
        </div>
      </div>
  );
}

export default Homepage;
