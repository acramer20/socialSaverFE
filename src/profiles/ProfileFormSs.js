import React, { useState, useContext } from "react";
import Alert from "../shared/Alert";
import SocialSaverApi from "../api/apiSS";
import UserContext from "../forms/UserContext";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

/** Edit the profile through the profile form at /profile. Shows a form that allows for you to change the information of a user
 */

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formInputs, setFormInputs] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  console.debug(
      "ProfileForm",
      "currentUser=", currentUser,
      "formInputs=", formInputs,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );


  async function handleSubmit(e) {
    e.preventDefault();

    let profileData = {
      firstName: formInputs.firstName,
      lastName: formInputs.lastName,
      email: formInputs.email,
      password: formInputs.password,
    };

    let username = formInputs.username;
    let updatedUser;

    try {
      updatedUser = await SocialSaverApi.saveProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormInputs(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // onsubmit reloads user information to new and updated
    setCurrentUser(updatedUser);
  }

  /** Handles when the form data changes */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormInputs(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3 className="text-center">Profile</h3>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Username</label>
                <p className="form-control-plaintext">{formInputs.username}</p>
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                    name="firstName"
                    className="form-control form-control-lg"
                    value={formInputs.firstName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                    name="lastName"
                    className="form-control form-control-lg"
                    value={formInputs.lastName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                    name="email"
                    className="form-control form-control-lg"
                    value={formInputs.email}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Confirm password to make changes:</label>
                <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    value={formInputs.password}
                    onChange={handleChange}
                />
              </div>

              {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null}

              <button
                  className="btn btn-outline-primary btn-block mt-4"
                  onClick={handleSubmit}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default ProfileForm;