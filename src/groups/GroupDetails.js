import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DeleteGroupForm from "../forms/DeleteGroupForm";
import UpdateGroupForm from "../forms/UpdateGroupForm";
import SocialSaverApi from "../api/apiSS";
import LoadingSpinner from "../shared/LoadingSpinner";

/** Show the basic information about a group.
 *
 * uses GroupCardList to show a card for each group.
 */

function GroupDetails() {
  console.debug("GroupDetails");
  const { id } = useParams();
  console.debug("GroupDetails", "id=", id);

  const [group, setGroup] = useState(null);

  useEffect(function getGroupDetails() {
    async function getGroup() {
        setGroup(await SocialSaverApi.getGroup(id));
    }
    getGroup();
  }, [id]);

  console.debug("UpdateGroupForm", "group=", group)

  if(!group) return <LoadingSpinner />

  return (
      <div className="GroupCard card">
        <div className="card-body">
          <h6 className="card-title">{group.title}</h6>
          <p>{group.description}</p>
          {group.target_goal && <div><small>Target Goal: ${group.target_goal.toLocaleString()}</small></div>}
          <div>
            <Link className="btn btn-outline-primary btn-sm text-center font-weight-bold" to={`/groups/${id}/members`}>
              Members
            </Link>
            <DeleteGroupForm id={id}/>
            <UpdateGroupForm id={id} title={group.title} description={group.description} target_goal={group.target_goal}/>
          </div>
        </div>
      </div>
  );
}

/** Shows the target_goal in a more readable way */

function formatTargetGoal(target_goal) {
  const digitsRev = [];
  const targetStr = target_goal.toString();

  for (let i = targetStr.length - 1; i >= 0; i--) {
    digitsRev.push(targetStr[i]);
    if (i > 0 && i % 3 === 0) digitsRev.push(",");
  }

  return digitsRev.reverse().join("");
}


export default GroupDetails;