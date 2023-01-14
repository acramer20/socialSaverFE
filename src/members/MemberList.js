import React, { useState, useEffect } from "react";
import SearchForm from "../shared/SearchForm";
import SocialSaverApi from "../api/apiSS";
import MemberCard from "./MemberCard";
import LoadingSpinner from "../shared/LoadingSpinner";

/** uses api to load a list of members and display them in their individual cards
 */

function MemberList() {
  console.debug("MemberList");

  const [members, setMember] = useState(null);

  useEffect(function getMembersOnMount() {
    console.debug("MembersList useEffect getMembersOnMount");
    search();
  }, []);

  /** On submit this is used to reload the searched members. */
  async function search(group_id) {
    let members = await SocialSaverApi.getMembers(group_id);
    setMember(members);
  }

  if (!members) return <LoadingSpinner />;

  return (
      <div className="MemberList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {members.length
            ? (
                <div className="MemberList-list">
                  {members.map(m => (
                      <MemberCard
                          key={m.username}
                          id = {m.id}
                          username={m.username}
                          group_id={m.group_id}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry boo boo, no results here for you you.</p>
            )}
      </div>
  );
}

export default MemberList;