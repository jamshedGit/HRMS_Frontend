import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

/**
 * Create Arrear Policy
 * 
 * @param {Object} body 
 * @returns res
 */
export function createArrearSetup(body) {
  return axios.post(`${USERS_URL}/arrear_policy/create-arrear-policy`, body);
}

/**
 * 
 * Get All Arear Policy Data Paginated
 * 
 * @param {Object} body 
 * @returns res
 */
export async function getAllArrearSetup(body) {
  return axios.post(`${USERS_URL}/arrear_policy/read-all-arrear-policy`, body);
}

/**
 * 
 * Get Single Arrear Policy By Id
 * 
 * @param {String|Number} id 
 * @returns 
 */
export function getArrearSetupById(id) {
  return axios.get(`${USERS_URL}/arrear_policy/read-arrear-policy/${id}`);
}

/**
 *
 * Update Single Arrear Policy By Id
 *  
 * @param {Object} body 
 * @returns 
 */
export function updateArrearSetup(body) {
  return axios.put(`${USERS_URL}/arrear_policy/update-arrear-policy`, body);
}

/**
 *
 * Delete Single Arrear Policy By Id
 *  
 * @param {Object} body 
 * @returns 
 */
export function deleteArrearSetup(id) {
  return axios.delete(`${USERS_URL}/arrear_policy/delete-arrear-policy/${id}`);
}

//get All Roles
export function getAllRoles() {
  return axios.get(`${USERS_URL}/settings/read-all-roles-master-data`);
}

//get All Centers
export function getAllCenters() {
  return axios.get(`${USERS_URL}/settings/read-all-centers-master-data`);
}

export function getAllUserStatusTypes(body) {
  return axios.post(
    `${USERS_URL}/settings/read-all-status-types-master-data`,
    body
  );
}

export const donationReport = async (body) => {
  return await axios.post(`${USERS_URL}/edrs/donation-report`, body);
};

