import React from "react";
// import UserContext from "../forms/UserContext";
import { Link } from "react-router-dom";
import DeleteGroupForm from "../forms/DeleteGroupForm";

/** Show the basic information about a group.
 *
 * uses GroupCardList to show a card for each group.
 */

function GroupCard({ id, title, description, target_goal}) {
  console.debug("GroupCard");

  // const { hasAppliedToGroup, applyToGroup } = useContext(UserContext);
  // const [applied, setApplied] = useState();

  // React.useEffect(function updateAppliedStatus() {
  //   console.debug("GroupCard useEffect updateAppliedStatus", "id=", id);

  //   setApplied(hasAppliedToGroup(id));
  // }, [id, hasAppliedToGroup]);

  /** Apply for a group */
  // async function handleApply(evt) {
  //   if (hasAppliedToGroup(id)) return;
  //   applyToGroup(id);
  //   setApplied(true);
  // }

  // <p>{description}</p>
  //         {target_goal && <div><small>Target Goal: {target_goal.toLocaleString()}</small></div>}

  return (
      <div className="GroupCard card"> 
        <div className="card-body">
          <h6 className="TitleCard card-title text-center">Group Name: {title}</h6>
          <div className="text-center">
            <Link className="btn btn-outline-primary btn-sm text-center mr-1 font-weight-bold" to={`/groups/${id}`}>
              Group Details
            </Link>
            <Link className="btn btn-outline-primary btn-sm text-center font-weight-bold" to={`/groups/${id}/members`}>
              Members
            </Link>
            <DeleteGroupForm id={id}/>
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


export default GroupCard;
