import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createReceipt(body) {
  // console.log("CreateUser", body)
  return axios.post(`${USERS_URL}/edrs/create-receipt`, body);
  
}

// Read
export function getAllReceipts(body) {
  
  
  return axios.post(`${USERS_URL}/edrs/read-all-receipt`, body);
}

let authSMSSend =  async ()=> {
  let auth_url = 'https://telenorcsms.com.pk:27677/corporate_sms2/api/auth.jsp?msisdn=923468215637&password=Pakistan1@edhi@karachi';
  return axios.post(auth_url);    
  
  };
  

export function getReceiptById(id) {
   console.log("getReceipt id", id)
  return axios.post(`${USERS_URL}/edrs/read-receipt`, id);
}

//Update
export function updateUser(user) {
   console.log("updateUser 12", user)
  return axios.put(`${USERS_URL}/edrs/update-receipt`, user);
}

//Delete
export function deleteUser(body) {
  
  return axios.patch(`${USERS_URL}/edrs/delete-receipt`, body);
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
