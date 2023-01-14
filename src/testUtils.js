import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
  photo_url: null,
};

const UserProvider =
    ({ children, currentUser = demoUser, hasAppliedToGroup = () => false }) => (
    <UserContext.Provider value={{ currentUser, hasAppliedToGroup }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };
