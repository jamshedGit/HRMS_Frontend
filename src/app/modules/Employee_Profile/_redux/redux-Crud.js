import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;


export function uploadImage(body) {
  return axios.post(`${USERS_URL}/file-upload`, body);
}

//Create record
export function createReimbursementClaim(body) {
 

  return axios.post(`${USERS_URL}/employee_profile/create-employee-profile`, body);

  
}


// Read
export function getAllReimbursementClaim(body) {


  return axios.post(`${USERS_URL}/employee_profile/read-all-employee-profile`, body);
}

export function getReimbursementClaimById(id) {

  return axios.post(`${USERS_URL}/employee_profile/read-employee-profile`, id);
}

//Update
export function updateReimbursementClaim(reimbursementClaim) {
   
  return axios.put(`${USERS_URL}/employee_profile/update-employee-profile`, reimbursementClaim);
}

//Delete
export function deleteReimbursementClaim(body) {

  return axios.patch(`${USERS_URL}/employee_profile/delete-employee-profile`, body);
}

export function getAllReimbursementConfigPolicy(body) {
 

  return axios.post(`${USERS_URL}/employee_profile/read-reimbursement-configuration-policies`, body);

  
}