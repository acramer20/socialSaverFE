import axios from "axios";
import { Alert } from "bootstrap";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *F
 */

class SocialSaverApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${SocialSaverApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      alert(message)
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a member by handle. */

  static async getMember(id) {
    let res = await this.request(`members/${id}`);
    return res.member;
  }

  /** Getting the members of a group  ??? */
  static async getMembers(group_id) {
    let res = await this.request(`members`, {group_id});
    return res.members;
  }

  static async createMember(data){
    let res = await this.request(`members/`, data, "post");
    return res;
  }

  /** get the current user */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** getting the list of groups */

  static async getGroups(groupTitle){
    let res = await this.request("groups", { title : groupTitle });
    return res.groups;
  }

  /** getting a group based on id */
  static async getGroup(id){
    let res = await this.request(`groups/${id}`);
    return res.group;
  }

  /** now applying to the groups -- post request ??? */

  static async applyToGroup(username, id){
    await this.request(`users/${username}/groups/${id}`, {}, "post");
  }

  /**Signing up for site */
  static async signup(data){
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** getting login token --- post request */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Editing profile page */

  static async saveProfile(username, data){
    let res = await this.request(`users/${username}`, data, "patch")
    return res.user;
  }

  /** Create a new group (what to put in line 95 - res.id? res.title?*/

  static async createGroup(data){
    let res = await this.request(`groups/`, data, "post");
    return res.group.id;
  }

  /** Editing the group */

  static async updateGroup(id, data){
    let res = await this.request(`groups/${id}`, data, "patch");
    return res.group
  }

  /** Delete User */

  static async deleteUser(username){
    await this.request(`users/${username}`, "delete")
  }
  /** Delete Member */
  static async deleteMember(member_id, group_id){
    return await this.request(`members/${member_id}`,{group_id : group_id}, "delete")
  }
  /** Delete Group */
  static async deleteGroup(id){
    return await this.request(`groups/${id}`,{}, "delete")

  }



  // obviously, you'll add a lot here ...
}

export default SocialSaverApi;
// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
