import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createLoanType(body) {
  console.log("create loan_type step 1", body)
  return axios.post(`${USERS_URL}/loan_type/create-loan-type`, body);
}


// Read
export function getAll_LoanType(body) {
  console.log("body",body);
  return axios.post(`${USERS_URL}/loan_type/read-all-loan-type`, body);
}



export function get_LoanTypeById(id) {
   console.log(" loan_type id", id)
  return axios.post(`${USERS_URL}/loan_type/read-loan-type`, id);
}

//Update
export function update_LoanType(loan_type) {
   console.log("loan_type 12", loan_type)
  return axios.put(`${USERS_URL}/loan_type/update-loan-type`, loan_type);
}

//Delete
export function delete_LoanType(body) {
  console.log("body")
  console.log(body);
  return axios.patch(`${USERS_URL}/loan_type/delete-loan-type`, body);
}

//get All Roles
export function getAllRoles() {
  return axios.get(`${USERS_URL}/settings/read-all-roles-master-data`);
}

//get All Centers



export function getAllUserStatusTypes(body) {
  return axios.post(
    `${USERS_URL}/settings/read-all-status-types-master-data`,
    body
  );
}


