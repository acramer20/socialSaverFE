import React from "react";
import { Link } from "react-router-dom";

import "./MemberCard.css";

/** Show basic information about member and renders the member info in a card format
 */

function MemberCard({ id, username, group_id }) {
  console.debug("MemberCard");

  return (
      <Link className="MemberCard card" to={`/members/${id}`}>
        <div className="card-body">
          <h6 className="card-title">
            {username}
            {group_id}
          </h6>
        </div>
      </Link>
  );
}

export default MemberCard;
