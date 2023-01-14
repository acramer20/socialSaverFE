import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SocialSaverApi from "../api/apiSS";
// import Alert from "../shared/Alert";

/** Create a member form. 
 * This populates a form for users to use to create a member in a group. It will redirect to the members route as well once the create function has been called
 */

function CreateMemberForm({ createMember, id}) {
  const history = useHistory();
  const [formInputs, setFormInputs] = useState({
    username: "",
    group_id: id,
  });

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /members.
   */

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await SocialSaverApi.createMember(formInputs);
    console.log("random")
    console.log(result)
    console.log(result.member)
    if (result.member !== undefined) {
        window.location.reload(false)
      history.push(`groups/${id}/members/`);
    } else {
      console.log("Member Could Not be Created")
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
          <h2 className="text-center">Add a New Member</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      type="username"
                      name="username"
                      className="form-control form-control-lg"
                      value={formInputs.username}
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

export default CreateMemberForm;