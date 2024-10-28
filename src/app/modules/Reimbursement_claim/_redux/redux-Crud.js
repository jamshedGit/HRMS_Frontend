import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createSalarypolicy(body) {
 
  
  // body.Name = body.txtsalarypolicyName;
  // delete body.txtsalarypolicyName

  return axios.post(`${USERS_URL}/reimbursement_claim/create-reimbursement-claim`, body);

  
}


// Read
export function getAllSalarypolicy(body) {

  return axios.post(`${USERS_URL}/reimbursement_claim/read-all-reimbursement-claim`, body);
}

export function getSalarypolicyById(id) {

  return axios.post(`${USERS_URL}/reimbursement_claim/read-reimbursement-claim`, id);
}

//Update
export function updateSalarypolicy(salarypolicy) {
   
  return axios.put(`${USERS_URL}/reimbursement_claim/update-reimbursement-claim`, salarypolicy);
}

//Delete
export function deleteSalarypolicy(body) {

  return axios.patch(`${USERS_URL}/reimbursement_claim/delete-reimbursement-claim`, body);
}
