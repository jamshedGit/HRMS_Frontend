import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createDept(body) {
  console.log("create Dept step 1", body)
  return axios.post(`${USERS_URL}/department/create-dept`, body);
}


// Read
export function getAllDept(body) {
  
  return axios.post(`${USERS_URL}/department/read-all-dept`, body);
} 
 

export function getDeptById(id) {
   console.log(" dept id", id)
  return axios.post(`${USERS_URL}/department/read-dept`, id);
}

//Update
export function updateDept(bank) {
   console.log("updateUser 12", bank)
  return axios.put(`${USERS_URL}/department/update-dept`, bank);
}

//Delete
export function deleteDept(body) {
  console.log("delete department")
  console.log(body);
  return axios.patch(`${USERS_URL}/department/delete-dept`, body);
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
