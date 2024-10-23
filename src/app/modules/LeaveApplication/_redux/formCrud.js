import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

/**
 * Create Leave Application
 * 
 * @param {Object} body 
 * @returns res
 */
export function createLeaveApplicationSetup(body) {
  return axios.post(`${USERS_URL}/leave_application/create-leave-application`, body);
}

/**
 * 
 * Get All Leave Application Data Paginated
 * 
 * @param {Object} body 
 * @returns res
 */
export async function getAllLeaveApplicationSetup(body) {
  return axios.post(`${USERS_URL}/leave_application/read-all-leave-application`, body);
}

/**
 * 
 * Get Single Leave Application By Id
 * 
 * @param {String|Number} id 
 * @returns 
 */
export function getLeaveApplicationSetupById(id) {
  return axios.get(`${USERS_URL}/leave_application/read-leave-application/${id}`);
}

/**
 *
 * Update Single Leave Application By Id
 *  
 * @param {Object} body 
 * @returns 
 */
export function updateLeaveApplicationSetup(body) {
  return axios.put(`${USERS_URL}/leave_application/update-leave-application`, body);
}

/**
 *
 * Delete Single Leave Application By Id
 *  
 * @param {Object} body 
 * @returns 
 */
export function deleteLeaveApplicationSetup(id) {
  return axios.delete(`${USERS_URL}/leave_application/delete-leave-application/${id}`);
}
