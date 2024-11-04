import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

/**
 * Create Employee Leave Balance
 * 
 * @param {Object} body 
 * @returns res
 */
export function createEmployeeLeaveBalanceSetup(body) {
  return axios.post(`${USERS_URL}/employee_leave_balance/create-employee-leave-balance`, body);
}

/**
 * 
 * Get All Employee Leave Balance Data Paginated
 * 
 * @param {Object} body 
 * @returns res
 */
export async function getAllEmployeeLeaveBalanceSetup(body) {
  return axios.post(`${USERS_URL}/employee_leave_balance/read-all-employee-leave-balance`, body);
}

/**
 * 
 * Get Single Employee Leave Balance By Id
 * 
 * @param {Object} body 
 * @returns 
 */
export function getEmployeeLeaveBalanceSetupByFilters(body) {
  return axios.post(`${USERS_URL}/employee_leave_balance/read-employee-leave-balance`, body);
}

/**
 *
 * Update Single Employee Leave Balance By Id
 *  
 * @param {Object} body 
 * @returns 
 */
export function updateEmployeeLeaveBalanceSetup(body) {
  return axios.put(`${USERS_URL}/employee_leave_balance/update-employee-leave-balance`, body);
}

/**
 *
 * Delete Single Employee Leave Balance By Id
 *  
 * @param {Object} body 
 * @returns 
 */
export function deleteEmployeeLeaveBalanceSetup(id) {
  return axios.delete(`${USERS_URL}/employee_leave_balance/delete-employee-leave-balance/${id}`);
}
