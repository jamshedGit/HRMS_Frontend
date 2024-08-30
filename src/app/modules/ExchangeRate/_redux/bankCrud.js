import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createExchangeRate(body) {
  console.log("create exchangerate step 1", body)
  
  // body.Name = body.txtExchangeRateName;
  // delete body.txtExchangeRateName

  return axios.post(`${USERS_URL}/exchange/create-exchange-rate`, body);
}


// Read
export function getAllExchangeRate(body) {
  console.log("body",body);
  return axios.post(`${USERS_URL}/exchange/read-all-exchange-rate`, body);
}



export function getExchangeRateById(id) {
   console.log(" ExchangeRate id", id)
  return axios.post(`${USERS_URL}/exchange/read-exchange-rate`, id);
}

//Update
export function updateExchangeRate(ExchangeRate) {
   console.log("ExchangeRate 12", ExchangeRate)
  return axios.put(`${USERS_URL}/exchange/update-exchange-rate`, ExchangeRate);
}

//Delete
export function deleteExchangeRate(body) {
  console.log("body")
  console.log(body);
  return axios.patch(`${USERS_URL}/exchange/delete-exchange-rate`, body);
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


