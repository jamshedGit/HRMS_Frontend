import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createHoliday(body) {

  return axios.post(`${USERS_URL}/payroll_process/create-payroll-process`, body);
  
}


// Read
export function getAllHoliday(body) {

  return axios.post(`${USERS_URL}/payroll_process/read-all-payroll-process`, body);
}

export function getHolidayById(id) {

  return axios.post(`${USERS_URL}/payroll_process/read-payroll-process`, id);
}

//Update
export function updateHoliday(body) {
   
  return axios.put(`${USERS_URL}/payroll_process/update-payroll-process`, body);
}

//Delete
export function deleteHoliday(body) {

  return axios.patch(`${USERS_URL}/payroll_process/delete-payroll-process`, body);
}
