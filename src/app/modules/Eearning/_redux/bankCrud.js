import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createEarning(body) {
  console.log("create earning step 1", body)
  
  // body.Name = body.txtEarningName;
  // delete body.txtEarningName

  return axios.post(`${USERS_URL}/earning/create-earning`, body);
}


// Read
export function getAllEarning(body) {
  
  return axios.post(`${USERS_URL}/earning/read-all-earning`, body);
}



export function getEarningById(id) {
   console.log(" earning id", id)
  return axios.post(`${USERS_URL}/earning/read-earning`, id);
}

//Update
export function updateEarning(earning) {
   console.log("earning 12", earning)
  return axios.put(`${USERS_URL}/earning/update-earning`, earning);
}

//Delete
export function deleteEarning(body) {
  
  return axios.patch(`${USERS_URL}/earning/delete-earning`, body);
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


