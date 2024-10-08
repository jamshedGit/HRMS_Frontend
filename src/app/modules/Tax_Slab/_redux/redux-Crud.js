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
  return axios.post(`${USERS_URL}/tax_slab/read-all-tax-slab`, body);
}

export function getSalarypolicyById(id) {
   console.log("salarypolicy id", id)
  return axios.post(`${USERS_URL}/tax_slab/read-tax-slab`, id);
}

//Update
export function updateSalarypolicy(salarypolicy) {
   
  return axios.put(`${USERS_URL}/tax_slab/update-tax-slab`, salarypolicy);
}

//Delete
export function deleteSalarypolicy(body) {
  console.log("body")
  console.log(body);
  return axios.patch(`${USERS_URL}/tax_slab/delete-tax-slab`, body);
}
