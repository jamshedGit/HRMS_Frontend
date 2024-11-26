import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;




//Create record
export function createPayrollProcess(body) {
 

  return axios.post(`${USERS_URL}/payroll_process/create-payroll-process`, body);

  
}


// Read
export function getAllPayrollProcess(body) {


  return axios.post(`${USERS_URL}/payroll_process/read-all-payroll-process`, body);
}

export function getPayrollProcessById(id) {

  return axios.post(`${USERS_URL}/payroll_process/read-payroll-process`, id);
}

//Update
export function updatePayrollProcess(body) {
   
  return axios.put(`${USERS_URL}/payroll_process/update-payroll-process`, body);
}

//Delete
export function deletePayrollProcess(body) {

  return axios.patch(`${USERS_URL}/payroll_process/delete-payroll-process`, body);
}

