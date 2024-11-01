import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;


export function uploadImage(body) {
  return axios.post(`${USERS_URL}/file-upload`, body);
}

//Create record
export function createSalarypolicy(body) {
 

  return axios.post(`${USERS_URL}/reimbursement_claim/create-reimbursement-claim`, body);

  
}


// Read
export function getAllSalarypolicy(body) {
  console.log("body",body)

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

export function getAllReimbursementConfigPolicy(body) {
 

  return axios.post(`${USERS_URL}/reimbursement_claim/read-reimbursement-configuration-policies`, body);

  
}