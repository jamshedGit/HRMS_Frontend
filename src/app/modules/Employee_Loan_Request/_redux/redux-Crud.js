import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;


export function uploadImage(body) {
  return axios.post(`${USERS_URL}/file-upload`, body);
}

//Create record
export function createReimbursementClaim(body) {
 

  return axios.post(`${USERS_URL}/reimbursement_claim/create-employee-loan-request`, body);

  
}


// Read
export function getAllReimbursementClaim(body) {


  return axios.post(`${USERS_URL}/employee_loan_request/read-all-employee-loan-request`, body);
}

export function getReimbursementClaimById(id) {

  return axios.post(`${USERS_URL}/employee_loan_request/read-employee-loan-request`, id);
}

//Update
export function updateReimbursementClaim(reimbursementClaim) {
   
  return axios.put(`${USERS_URL}/employee_loan_request/update-employee-loan-request`, reimbursementClaim);
}

//Delete
export function deleteReimbursementClaim(body) {

  return axios.patch(`${USERS_URL}/employee_loan_request/delete-employee-loan-request`, body);
}

export function getAllReimbursementConfigPolicy(body) {
 

  return axios.post(`${USERS_URL}/employee_loan_request/read-reimbursement-configuration-policies`, body);

  
}

export function getAllLoanType() {


  return axios.get(`${USERS_URL}/loan_management_configuration/get-all-loan-type`);

  
}