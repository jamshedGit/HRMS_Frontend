import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

export function createRequest(body) {
  return axios.post(`${USERS_URL}/centers/create-center`, body);
}

// Read
export function getAllRequest(body) {
  return axios.post(`${USERS_URL}/centers/read-all-centers`, body);
}

export const getById = async (id) => {
  // console.log("getUserById id", id)
  return await axios.post(`${USERS_URL}/centers/read-center`, id);
};

//Update
export function updateRequest(user) {
  // console.log("updateUser", user)
  return axios.put(`${USERS_URL}/centers/update-center`, user);
}

//Delete
export function deleteRequest(body) {
  return axios.patch(`${USERS_URL}/centers/delete-center`, body);
}

//Get Vehice By Center ID

export function getVehiclesById(body) {
  return axios.post(
    `${USERS_URL}/vehicles/read-all-vehicles-by-centerId`,
    body
  );
}

export function getAllCountry() {
  return axios.get(
    "https://app-8e308de5-0daf-4f85-ac89-7ce29bdad705.cleverapps.io/apis/settings/read-all-countries-master-data"
  );
}

export const getAllCity = async (body) => {
  return await axios.post(
    `https://app-8e308de5-0daf-4f85-ac89-7ce29bdad705.cleverapps.io/apis/settings/read-all-cities-master-data`,
    { countryId: body }
  );
};
