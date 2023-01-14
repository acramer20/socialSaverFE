import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import SocialSaverApi from "../api/apiSS";
// import Alert from "../shared/Alert";

/** Create a group form. 
 * This populates a form for users to use to create a group. It will redirect to the groups route as well once the create function has been called
 */

function UpdateGroupForm({id, title, description, target_goal}) {
  

  const history = useHistory();
  const [formInputs, setFormInputs] = useState({
    title: title,
    description: description,
    target_goal: target_goal,
  });


  async function handleSubmit(e) {
    e.preventDefault();
    let result = await SocialSaverApi.updateGroup(id, formInputs);
    if (result !== undefined) {
      history.push(`/groups/`);
    } else {
      console.log("Group Could Not Be Updated")
    }
  }

  /** Update form data field */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormInputs(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="CreateGroupForm">
        <div className="float-left">
            <h2>
            <button class="btn btn-outline-primary btn-sm font-weight-bold" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Update Group
            </button>
            </h2>
            <div class="collapse" id="collapseExample">
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
      </div>
  );
}

export default UpdateGroupForm;