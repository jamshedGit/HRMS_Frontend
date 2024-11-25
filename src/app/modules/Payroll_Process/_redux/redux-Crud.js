import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;


export function uploadImage(body) {
  return axios.post(`${USERS_URL}/file-upload`, body);
}

//Create record
export function createReimbursementClaim(body) {
 

  return axios.post(`${USERS_URL}/payroll_process/create-payroll-process`, body);

  
}


// Read
export function getAllReimbursementClaim(body) {


  return axios.post(`${USERS_URL}/payroll_process/read-all-payroll-process`, body);
}

export function getReimbursementClaimById(id) {

  return axios.post(`${USERS_URL}/payroll_process/read-payroll-process`, id);
}

//Update
export function updateReimbursementClaim(reimbursementClaim) {
   
  return axios.put(`${USERS_URL}/payroll_process/update-payroll-process`, reimbursementClaim);
}

//Delete
export function deleteReimbursementClaim(body) {

  return axios.patch(`${USERS_URL}/payroll_process/delete-payroll-process`, body);
}

export function getAllReimbursementConfigPolicy(body) {
 

  return axios.post(`${USERS_URL}/reimbursement_claim/read-reimbursement-configuration-policies`, body);

  
}