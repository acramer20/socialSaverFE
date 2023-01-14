import React from "react";
import GroupCard from "./GroupCard";

/** Show list of group cards - GroupList and MemberDetail use this and the user can send an application by simply hitting the apply button
 *
 * GroupList -> GroupCardList -> GroupCard
 * MemberDetail -> GroupCardList -> GroupCard
 *
 */

function GroupCardList({ groups, apply }) {
  console.debug("GroupCardList", "groups=", groups);

  return (
      <div className="GroupCardList">
        {groups.map(g => (
            <GroupCard
                key={g.id}
                id={g.id}
                title={g.title}
                description={g.description}
                target_goal={g.target_goal}
            />
        ))}
      </div>
  );
}

export default GroupCardList;