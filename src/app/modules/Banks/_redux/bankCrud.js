import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createBank(body) {
  console.log("create bank step 1", body)
  return axios.post(`${USERS_URL}/bank/create-bank`, body);
}
// Read
export function getAllBanks(body) {
  console.log("body",body);
  return axios.post(`${USERS_URL}/bank/read-all-banks`, body);
}


export function getBankById(id) {
   console.log(" bank id", id)
  return axios.post(`${USERS_URL}/bank/read-bank`, id);
}

//Update
export function updateBank(bank) {
   console.log("updateUser 12", bank)
  return axios.put(`${USERS_URL}/bank/update-bank`, bank);
}

//Delete
export function deleteBank(body) {
  console.log("body")
  console.log(body);
  return axios.patch(`${USERS_URL}/bank/delete-bank`, body);
}





