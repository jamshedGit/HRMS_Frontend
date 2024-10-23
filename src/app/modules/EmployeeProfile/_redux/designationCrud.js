import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createEmpProfile(body) {
  console.log("emp profile religion step 1", body)
  
  // body.Name = body.txtbankName;
  // delete body.txtbankName

  return axios.post(`${USERS_URL}/profile/create-profile`, body);
  
}
// Read
export function getAllEmpProfile(body) {
  console.log("body",body);
  return axios.post(`${USERS_URL}/profile/read-all-profile`, body);
}

export function getAllContactInfo(body) {
  console.log("body contact",body);
  return axios.post(`${USERS_URL}/profile/read-all-contact`, body);
}


export function getEmpProfileById(id) {
   console.log("Religion id", id)
  return axios.post(`${USERS_URL}/profile/read-profile`, id);
}

//Update
export function updateEmpProfile(religion) {
   console.log("updateUser 12", religion)
  return axios.put(`${USERS_URL}/profile/update-profile`, religion);
}

//Delete
export function deleteEmpProfile(body) {
  console.log("body")
  console.log(body);
  return axios.patch(`${USERS_URL}/profile/delete-profile`, body);
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



