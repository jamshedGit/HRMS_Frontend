import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createSalarypolicy(body) {

  
  // body.Name = body.txtsalarypolicyName;
  // delete body.txtsalarypolicyName

  return axios.post(`${USERS_URL}/loan_management_configuration/create-loan-management-configuration`, body);

  
}


// Read
export function getAllSalarypolicy(body) {

  return axios.post(`${USERS_URL}/loan_management_configuration/read-all-loan-management-configuration`, body);
}

export function getSalarypolicyById(id) {

  return axios.post(`${USERS_URL}/loan_management_configuration/read-loan-management-configuration`, id);
}

//Update
export function updateSalarypolicy(salarypolicy) {
   
  return axios.put(`${USERS_URL}/loan_management_configuration/update-loan-management-configuration`, salarypolicy);
}

//Delete
export function deleteSalarypolicy(body) {

  return axios.patch(`${USERS_URL}/loan_management_configuration/delete-loan-management-configuration`, body);
}
