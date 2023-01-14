import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SocialSaverApi from "../api/apiSS";
import GroupCardList from "../groups/GroupCardList";
import LoadingSpinner from "../shared/LoadingSpinner";

/** Member Detail page. Gives info on the Member and the groups it has available.
 */

function MemberDetail() {
  const { id } = useParams();
  console.debug("MemberDetail", "id=", id);

  const [member, setMember] = useState(null);

  useEffect(function getMemberAndGroupsForUser() {
    async function getMember() {
      setMember(await SocialSaverApi.getMember(id));
    }

    getMember();
  }, [id]);

  if (!member) return <LoadingSpinner />;

  return (
      <div className="MemberDetail col-md-8 offset-md-2">
        <h4 className="text-center">{member.username}</h4>
        <h5>Your Groups:</h5>
        <GroupCardList groups={member.groups} />
      </div>
  );
}

export default MemberDetail;