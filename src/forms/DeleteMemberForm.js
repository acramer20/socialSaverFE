import React from "react";
import { useHistory } from "react-router-dom";
import SocialSaverApi from "../api/apiSS";
/**DEleting a member  */
function DeleteMemberForm({member_id, group_id}) {
    const history = useHistory();


async function handleSubmit(e) {

    e.preventDefault();
    let result = await SocialSaverApi.deleteMember(member_id, group_id);
    if (result !== undefined) {
        window.location.reload(false)
      history.push("/members");
    } else {
      console.log("Member Could Not be Deleted")
    }
  }

return (
    <div>
        <button
            className="ml-1 btn btn-outline-danger btn-sm font-weight-bold"
            onClick={handleSubmit}
        >
        Delete
        </button>
    </div>
)
}

export default DeleteMemberForm;