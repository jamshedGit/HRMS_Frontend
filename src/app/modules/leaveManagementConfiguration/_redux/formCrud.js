import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

/**
 * Create Leave Configurations
 * 
 * @param {Object} body 
 * @returns res
 */
export function createleaveManagementConfigurationSetup(body) {
  return axios.post(`${USERS_URL}/leave_management_configuration/create-leave-management-configuration`, body);
}

/**
 * 
 * Get All Leave Configurations Data Paginated
 * 
 * @param {Object} body 
 * @returns res
 */
export async function getAllleaveManagementConfigurationSetup(body) {
  return axios.post(`${USERS_URL}/leave_management_configuration/read-all-leave-management-configuration`, body);
}

/**
 * 
 * Get Leave Configurations Dropdown Data
 * 
 * @param {Object} body 
 * @returns res
 */
export async function getTypeDropdownData(id) {
  return axios.get(`${USERS_URL}/leave_management_configuration/read-leave-type-dropdown`);
}

/**
 * 
 * Get Single Leave Configurations By Id
 * 
 * @param {String|Number} id 
 * @returns 
 */
export function getleaveManagementConfigurationSetupById(id) {
  return axios.get(`${USERS_URL}/leave_management_configuration/read-leave-type/${id}`);
}

/**
 *
 * Update Single Leave Configurations By Id
 *  
 * @param {Object} body 
 * @returns 
 */
export function updateleaveManagementConfigurationSetup(body) {
  return axios.put(`${USERS_URL}/leave_management_configuration/update-leave-management-configuration`, body);
}

/**
 *
 * Delete Single Leave Configurations By Id
 *  
 * @param {Object} body 
 * @returns 
 */
export function deleteleaveManagementConfigurationSetup(id) {
  return axios.delete(`${USERS_URL}/leave_management_configuration/delete-leave-management-configuration/${id}`);
}
