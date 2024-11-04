import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createSalarypolicy(body) {
  console.log("loan step 1", body)
  
  // body.Name = body.txtsalarypolicyName;
  // delete body.txtsalarypolicyName

  return axios.post(`${USERS_URL}/reimbursement_configuration/create-reimbursement-configuration`, body);

  
}


// Read
export function getAllSalarypolicy(body) {
  console.log("reimbursement_configuration s body",body);
  return axios.post(`${USERS_URL}/reimbursement_configuration/read-all-reimbursement-configuration`, body);
}

export function getSalarypolicyById(id) {
   console.log("salarypolicy id", id)
  return axios.post(`${USERS_URL}/reimbursement_configuration/read-reimbursement-configuration`, id);
}

//Update
export function updateSalarypolicy(salarypolicy) {
   
  return axios.put(`${USERS_URL}/reimbursement_configuration/update-reimbursement-configuration`, salarypolicy);
}

//Delete
export function deleteSalarypolicy(body) {

  return axios.patch(`${USERS_URL}/reimbursement_configuration/delete-reimbursement-configuration`, body);
}
