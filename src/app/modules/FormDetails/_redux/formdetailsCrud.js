import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createform(body) {
  console.log("create formdetails details step 1", body)
  
  // body.Name = body.txtbankName;
  // delete body.txtbankName

  return axios.post(`${USERS_URL}/formdetails/create-child-forms`, body);
  
}
// Read
export function getAllForm(body) {
  
  return axios.post(`${USERS_URL}/formdetails/read-all-parent-forms`, body);
}

// Get Child By ParentId
export function getAllChildFormById(id) {
  console.log("body",id);
  return axios.post(`${USERS_URL}/formdetails/read-all-child-forms`, {id});
}


export function getFormById(body) {
   console.log("form id 1", body.Id)
  //return axios.post(`${USERS_URL}/formdetails/read-all-parent-forms`, body.Id);
  return axios.post(`${USERS_URL}/form/read-form`, body);
}

//Update
export function updateForm(form) {
   console.log("updateUser 12", form)
  return axios.put(`${USERS_URL}/formdetails/update-child-forms`, form);
}

//Delete
export function deleteForm(body) {
  
  return axios.patch(`${USERS_URL}/formdetails/delete-child-forms`, body);
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
