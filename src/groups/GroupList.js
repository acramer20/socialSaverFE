import React, { useState, useEffect } from "react";
import Search from "../shared/SearchForm";
import SocialSaverApi from "../api/apiSS";
import GroupCardList from "./GroupCardList";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Link } from "react-router-dom";

/** Shows list of groups
 * GroupList -> GroupCardList -> GroupCard
 */

function GroupList() {
  console.debug("GroupList");

  const [groups, setGroups] = useState(null);

  useEffect(function getAllGroupsOnMount() {
    console.debug("GroupList useEffect getAllGroupsOnMount");
    search();
  }, []);

  /** With each search on submit, this is reloaded */
  async function search(title) {
    let groups = await SocialSaverApi.getGroups(title);
    setGroups(groups);
  }

  if (!groups) return (<div>
    <Link className="offset-md-2 btn btn-info" to={`/createGroup/`}>
      <h6>Create a New Group</h6>
    </Link>
    <LoadingSpinner/>
    </div>
    );

  return (
      <div>
      <div className="GroupList col-md-8 offset-md-2">
        <Search searchFor={search} /> 
        <Link className="col-md-8 offset-md-2 btn btn-outline-primary" to={`/createGroup/`}>
        <h6>Create a New Group</h6>
        </Link>
        <p></p>
        {groups.length
            ? <GroupCardList groups={groups} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
      </div>
  );
}

export default GroupList;