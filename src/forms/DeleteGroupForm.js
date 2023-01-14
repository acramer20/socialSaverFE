import React from "react";
import { useHistory } from "react-router-dom";
import SocialSaverApi from "../api/apiSS";
import "../groups/GroupCard.css";
/** deleting a group */
function DeleteGroupForm({id}) {
    const history = useHistory();

async function handleSubmit(e) {

    e.preventDefault();
    let result = await SocialSaverApi.deleteGroup(id);
    if (result !== undefined) {
        window.location.reload(false)
      history.push("/groups");
    } else {
      console.log("Group Could Not be Deleted")
    }
  }

return (
        <button
            className="ml-1 btn btn-outline-danger btn-sm font-weight-bold"
            onClick={handleSubmit}
        >
        Delete Group
        </button>
)
}

export default DeleteGroupForm;