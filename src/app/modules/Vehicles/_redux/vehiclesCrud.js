import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create Vehicle
export function createRequest(body) {
  return axios.post(`${USERS_URL}/vehicles/create-vehicle`, body);
}

// Read Vehicle
export function getAllRequest(body) {
  return axios.post(`${USERS_URL}/vehicles/read-all-vehicles`, body);
}
//Get Vehicle By ID
export function getById(id) {
  return axios.post(`${USERS_URL}/vehicles/read-vehicle`, id);
}

//Update Vehicle
export function updateRequest(user) {
  return axios.put(`${USERS_URL}/vehicles/update-vehicle`, user);
}

//Delete
export function deleteRequest(id) {
  return axios.patch(`${USERS_URL}/vehicles/delete-vehicle`, id);
}

//get All Centers

export function getAllCenters() {
  return axios.get(`${USERS_URL}/settings/read-all-centers-master-data`);
}

//get All Drivers that available in Center

export function getAllDrivers(id) {
  return axios.post(`${USERS_URL}/settings/read-all-drivers-master-data`, {
    subCenterId: id,
    available: true,
    notAvailable: false,
  });
}

//get All Vehicle categories
export function getAllCategories() {
  return axios.get(
    `${USERS_URL}/settings/read-all-vehicles-category-master-data`
  );
}
