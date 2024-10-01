import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createReligion(body) {
  console.log("create religion step 1", body)
  
  // body.Name = body.txtbankName;
  // delete body.txtbankName

  return axios.post(`${USERS_URL}/religion/create-religion`, body);
  
}
// Read
export function getAllReligion(body) {
  console.log("body employeeType",body);
  return axios.post(`${USERS_URL}/employeetype/read-all-employeetype`, body);
}


  

export function getReligionById(id) {
   console.log("Religion id", id)
  return axios.post(`${USERS_URL}/religion/read-religion`, id);
}

//Update
export function updateReligion(religion) {
   console.log("updateUser 12", religion)
  return axios.put(`${USERS_URL}/religion/update-religion`, religion);
}

//Delete
export function deleteReligion(body) {
  
  return axios.patch(`${USERS_URL}/religion/delete-religion`, body);
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


export const donationReport = async (body) => {
  return await axios.post(`${USERS_URL}/edrs/donation-report`, body);
};

export function sms_athentication(body) {
  return axios.post(
    `${USERS_URL}/settings/read-all-status-types-master-data`,
    body
  );
}
