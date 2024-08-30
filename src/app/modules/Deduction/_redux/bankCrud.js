import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createDeduction(body) {
  console.log("create Deduction step 1", body)
  
  // body.Name = body.txtDeductionName;
  // delete body.txtDeductionName

  return axios.post(`${USERS_URL}/deduction/create-deduction`, body);
}


// Read
export function getAllDeduction(body) {
  console.log("body",body);
  return axios.post(`${USERS_URL}/deduction/read-all-deduction`, body);
}



export function getDeductionById(id) {
   console.log(" Deduction id", id)
  return axios.post(`${USERS_URL}/deduction/read-deduction`, id);
}

//Update
export function updateDeduction(Deduction) {
   console.log("Deduction 12", Deduction)
  return axios.put(`${USERS_URL}/deduction/update-deduction`, Deduction);
}

//Delete
export function deleteDeduction(body) {
  console.log("body")
  console.log(body);
  return axios.patch(`${USERS_URL}/deduction/delete-deduction`, body);
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


