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





export default GroupCard;
