import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createBank(body) {
  console.log("create bank step 1", body)
  
  // body.Name = body.txtbankName;
  // delete body.txtbankName

  return axios.post(`${USERS_URL}/bank/create-bank`, body);
  
}


// Read
export function getAllBanks(body) {
  console.log("body",body);
  return axios.post(`${USERS_URL}/bank/read-all-banks`, body);
}

let authSMSSend =  async ()=> {
  let auth_url = 'https://telenorcsms.com.pk:27677/corporate_sms2/api/auth.jsp?msisdn=923468215637&password=Pakistan1@edhi@karachi';
  return axios.post(auth_url);    
  
  };
  

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
