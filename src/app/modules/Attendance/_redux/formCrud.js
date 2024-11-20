import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

/**
 * Create Attendance
 * 
 * @param {Object} body 
 * @returns res
 */
export function createAttendanceSetup(body) {
  return axios.post(`${USERS_URL}/attendance/create-attendance`, body);
}

/**
 * 
 * Get All Attendance Data Paginated
 * 
 * @param {Object} body 
 * @returns res
 */
export async function getAllAttendanceSetup(body) {
  return axios.post(`${USERS_URL}/attendance/read-all-attendance`, body);
}

/**
 * 
 * Get Single Attendance By Id
 * 
 * @param {String|Number} id 
 * @returns 
 */
export function getAttendanceSetupById(id) {
  return axios.get(`${USERS_URL}/attendance/read-attendance/${id}`);
}

/**
 * 
 * Get Single Attendance By Filters
 * 
 * @param {Obejct} filters 
 * @returns 
 */
export function getAttendanceSetupByFilters(filters) {
  return axios.post(`${USERS_URL}/attendance/read-attendance-data`, filters);
}

/**
 *
 * Update Single Attendance By Id
 *  
 * @param {Object} body 
 * @returns 
 */
export function updateAttendanceSetup(body) {
  return axios.put(`${USERS_URL}/attendance/update-attendance`, body);
}

/**
 *
 * Delete Single Attendance By Id
 *  
 * @param {Object} body 
 * @returns 
 */
export function deleteAttendanceSetup(id) {
  return axios.delete(`${USERS_URL}/attendance/delete-attendance/${id}`);
}
