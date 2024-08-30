import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createpolicy(body) {
  console.log("create religion step 1", body)
  
  // body.Name = body.txtbankName;
  // delete body.txtbankName

  return axios.post(`${USERS_URL}/policy/create-policy`, body);
  
}
// Read
export function getAllpolicy(body) {
  console.log("body",body);
  return axios.post(`${USERS_URL}/policy/read-all-policy`, body);
}



export function getpolicyById(id) {
   console.log("Religion id", id)
  return axios.post(`${USERS_URL}/policy/read-policy`, id);
}

//Update
export function updatepolicy(obj) {
   console.log("updateUser 12", obj)
  return axios.put(`${USERS_URL}/policy/update-policy`, obj);
}

//Delete
export function deletepolicy(body) {
  console.log("body")
  console.log(body);
  return axios.patch(`${USERS_URL}/policy/delete-policy`, body);
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



