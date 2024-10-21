import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createSalarypolicy(body) {

  return axios.post(`${USERS_URL}/accrue_gratuity_configuration/create-accrue-gratuity-configuration`, body);
  
}


// Read
export function getAllSalarypolicy(body) {

  return axios.post(`${USERS_URL}/accrue_gratuity_configuration/read-all-accrue-gratuity-configuration`, body);
}

export function getSalarypolicyById(id) {

  return axios.post(`${USERS_URL}/accrue_gratuity_configuration/read-accrue-gratuity-configuration`, id);
}

//Update
export function updateSalarypolicy(salarypolicy) {
   
  return axios.put(`${USERS_URL}/accrue_gratuity_configuration/update-accrue-gratuity-configuration`, salarypolicy);
}

//Delete
export function deleteSalarypolicy(body) {

  return axios.patch(`${USERS_URL}/accrue_gratuity_configuration/delete-accrue-gratuity-configuration`, body);
}
