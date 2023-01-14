import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../shared/Alert";

/** Login form 
 * Populates the form asking for username and password. 
 * On submission - 
 * calls the login function that is provided as a prop from api.js
 * if correctly inputed, it redirects the user to the /members route
 * 
 * route is /login
 */

function LoginForm({ login }) {
  const history = useHistory();
  const [formInputs, setFormInputs] = useState({ username: "", password: "", });
  const [formErrors, setFormErrors] = useState([]);


  console.debug(
      "LoginForm",
      "login=", typeof login,
      "formInputs=", formInputs,
      "formErrors", formErrors,
  );

  /** Handle form submit:
   * uses the login function and then redirects to /members when the user is successfully logged in.
   */

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await login(formInputs);
    if (result.success) {
      history.push("/members");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update the form data field */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormInputs(l => ({ ...l, [name]: value }));
  }

  return (
      <div className="LoginForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 className="offset-lg-5 mb-2">Log In</h3>

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
                      autoComplete="username"
                      required
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
                      autoComplete="current-password"
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
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

export default LoginForm;
