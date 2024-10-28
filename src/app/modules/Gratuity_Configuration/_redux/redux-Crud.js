import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createSalarypolicy(body) {

  return axios.post(`${USERS_URL}/gratuity_configuration/create-gratuity-configuration`, body);
  
}


// Read
export function getAllSalarypolicy(body) {

  return axios.post(`${USERS_URL}/gratuity_configuration/read-all-gratuity-configuration`, body);
}

export function getSalarypolicyById(id) {

  return axios.post(`${USERS_URL}/gratuity_configuration/read-gratuity-configuration`, id);
}

//Update
export function updateSalarypolicy(salarypolicy) {
   
  return axios.put(`${USERS_URL}/gratuity_configuration/update-gratuity-configuration`, salarypolicy);
}

//Delete
export function deleteSalarypolicy(body) {

  return axios.patch(`${USERS_URL}/gratuity_configuration/delete-gratuity-configuration`, body);
}
