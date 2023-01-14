import React, { useState, useEffect, useContext } from "react";
import SocialSaverApi from "../api/apiSS";
import LoadingSpinner from "../shared/LoadingSpinner";
import CreateMemberForm from "../forms/CreateMemberForm";
import { useParams, Link } from "react-router-dom";
import DeleteMemberForm from "../forms/DeleteMemberForm";
import UserContext from "../forms/UserContext";

/** Shows list of members
 */

function GroupMembers() {
    let { id } = useParams();
    const { currentUser, setCurrentUser } = useContext(UserContext);
  console.debug("GroupMembers");

  const [members, setMembers] = useState(null);

  useEffect(function getAllGroupsOnMount() {
    console.debug("GroupList useEffect getAllGroupsOnMount");
    findMember();
  }, []);

  /** With each search on submit, this is reloaded */
  async function findMember() {
    let members = await SocialSaverApi.getMembers(id);
    setMembers(members);
  }
//** uses create memberform to connect with backend */
  if (!members) return (<div>
    <CreateMemberForm id={id}/>
    <LoadingSpinner/>
    </div>
    );
    function isGroupAdmin(){
        let result = members.filter(member => {
            return member.username === currentUser.username && member.admin === true
          })
          return result.length > 0
    } 

  return (
      <div>
      <CreateMemberForm id={id}/>
      <div>
        <h2 className="text-center">Current Members:</h2>
      <div className="GroupList col-md-8 offset-md-2">
        {/* <Search searchFor={search} /> */}
        {members.length
            ? members.map(a_member => {
                return (<div><Link className="MemberCard card" to={`/members/${a_member.id}`}>
                                <div className="card-body">
                                <a className="card-title font-weight-bold">
                                    {a_member.username}
                                </a>
                                <div className="float-right">{isGroupAdmin() && <DeleteMemberForm member_id = {a_member.id} group_id={id}/>}</div>
                                </div>
                            </Link></div>
                )
            })
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
      </div>
      </div>
  );
}

export default GroupMembers;