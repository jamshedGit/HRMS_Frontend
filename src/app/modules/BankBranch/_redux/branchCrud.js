import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createBranch(body) {
  console.log("create branch step 1", body)
  
  return axios.post(`${USERS_URL}/branch/create-branch`, body);
  
}


// Read
export function getAllBranch(body) {
  console.log("body",body);
  return axios.post(`${USERS_URL}/branch/read-all-branch`, body);
}
 

export function getBranchById(id) {
   console.log(" bank id", id)
  return axios.post(`${USERS_URL}/branch/read-branch`, id);
}

//Update
export function updateBranch(bank) {
   console.log("updateUser 12", bank)
  return axios.put(`${USERS_URL}/branch/update-branch`, bank);
}

//Delete
export function deleteBranch(body) {
  console.log("body")
  console.log(body);
  return axios.patch(`${USERS_URL}/branch/delete-branch`, body);
}

//get All Roles
export function getAllRoles() {
  return axios.get(`${USERS_URL}/settings/read-all-roles-master-data`);
}

//get All Centers

export function getAllCenters() {
  return axios.get(`${USERS_URL}/settings/read-all-centers-master-data`);
}

export function getAllUserStatusTypes(body) {
  return axios.post(
    `${USERS_URL}/settings/read-all-status-types-master-data`,
    body
  );
}



export function sms_athentication(body) {
  return axios.post(
    `${USERS_URL}/settings/read-all-status-types-master-data`,
    body
  );
}
