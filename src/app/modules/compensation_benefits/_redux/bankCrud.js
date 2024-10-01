import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createCompensationBenefits(body) {
  console.log("create CompensationBenefits step 1", body)
  
  // body.Name = body.txtCompensationBenefitsName;
  // delete body.txtCompensationBenefitsName

  return axios.post(`${USERS_URL}/compensation/create-compensation-benefits`, body);
}


// Read
export function getAllCompensationBenefits(body) {
  
  return axios.post(`${USERS_URL}/compensation/read-all-compensation-benefits`, body);
}



export function getCompensationBenefitsById(id) {
   console.log(" CompensationBenefits id", id)
  return axios.post(`${USERS_URL}/compensation/read-compensation-benefits`, id);
}

//Update
export function updateCompensationBenefits(CompensationBenefits) {
   console.log("CompensationBenefits 12", CompensationBenefits)
  return axios.put(`${USERS_URL}/compensation/update-compensation-benefits`, CompensationBenefits);
}

//Delete
export function deleteCompensationBenefits(body) {
  
  return axios.patch(`${USERS_URL}/compensation/delete-compensation-benefits`, body);
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


