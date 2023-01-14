import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SocialSaverApi from "../api/apiSS";
// import Alert from "../shared/Alert";

/** Create a group form. 
 * This populates a form for users to use to create a group. It will redirect to the groups route as well once the create function has been called
 */

function CreateGroupForm({ createGroup }) {
  const history = useHistory();
  const [formInputs, setFormInputs] = useState({
    title: "",
    description: "",
    target_goal: 0,
  });

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /members.
   */

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await SocialSaverApi.createGroup(formInputs);
    if (result !== undefined) {
      history.push("/groups");
    } else {
      console.log("Group Could Not be Created")
    }
  }

  /** Update form data field */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormInputs(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="CreateGroupForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-2">Create a New Group</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Group Name</label>
                  <input
                      type="title"
                      name="title"
                      className="form-control form-control-lg"
                      value={formInputs.title}
                      onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <input
                      name="description"
                      className="form-control form-control-lg"
                      value={formInputs.description}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Target Goal</label>
                  <input
                      name="target_goal"
                      className="form-control form-control-lg"
                      value={formInputs.target_goal}
                      onChange={handleChange}
                  />
                </div>


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

export default CreateGroupForm;