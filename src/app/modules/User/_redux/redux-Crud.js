import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createHoliday(body) {

  return axios.post(`${USERS_URL}/holidays/create-holidays`, body);
  
}


// Read
export function getAllHoliday(body) {

  return axios.post(`${USERS_URL}/user/read-all-user`, body);
}

export function getHolidayById(id) {

  return axios.post(`${USERS_URL}/user/read-user`, id);
}

//Update
export function updateHoliday(body) {
   
  return axios.put(`${USERS_URL}/user/update-user`, body);
}

//Delete
export function deleteHoliday(body) {

  return axios.patch(`${USERS_URL}/user/delete-user`, body);
}
