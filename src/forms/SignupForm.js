import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../shared/Alert";

/** Signup form. 
 * This populates a form for users to use to sign up. It will redirect to the members route as well once the signup function has been called
 */

function SignupForm({ signup }) {
  const history = useHistory();
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formInputs=", formInputs,
      "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /members.
   */

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await signup(formInputs);
    if (result.success) {
      history.push("/members");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormInputs(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="SignupForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-2">Sign Up</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control form-control-lg"
                      value={formInputs.username}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      value={formInputs.password}
                      onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>First name</label>
                  <input
                      name="firstName"
                      className="form-control form-control-lg"
                      value={formInputs.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
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
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      value={formInputs.email}
                      onChange={handleChange}
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-outline-secondary btn-block"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SignupForm;