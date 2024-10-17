import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createSalarypolicy(body) {
  console.log("salary policy  step 1", body)
  
  // body.Name = body.txtsalarypolicyName;
  // delete body.txtsalarypolicyName

  return axios.post(`${USERS_URL}/salarypolicy/create-salarypolicy`, body);
  
}


// Read
export function getAllSalarypolicy(body) {
  console.log("salarypolicy body",body);
  return axios.post(`${USERS_URL}/salarypolicy/read-all-salarypolicy`, body);
}

export function getSalarypolicyById(id) {
   console.log("salarypolicy id", id)
  return axios.post(`${USERS_URL}/salarypolicy/read-salarypolicy`, id);
}

//Update
export function updateSalarypolicy(salarypolicy) {
   
  return axios.put(`${USERS_URL}/salarypolicy/update-salarypolicy`, salarypolicy);
}

//Delete
export function deleteSalarypolicy(body) {
  console.log("body")
  console.log(body);
  return axios.patch(`${USERS_URL}/salarypolicy/delete-salarypolicy`, body);
}
 

//Read current month 
export function getCurrentMonth() {
  console.log("getCurrentMonth ");
  return axios.get(`${USERS_URL}/salarypolicy/read-currentmonth`);
}
