import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function salarypolicyBank(body) {
  console.log("salary policy  step 1", body)
  
  // body.Name = body.txtbankName;
  // delete body.txtbankName

  return axios.post(`${USERS_URL}/salarypolicy/create-salarypolicy`, body);
  
}


// Read
export function getAllBanks(body) {
  console.log("salarypolicy body",body);
  return axios.post(`${USERS_URL}/salarypolicy/read-all-salarypolicy`, body);
}

let authSMSSend =  async ()=> {
  let auth_url = 'https://telenorcsms.com.pk:27677/corporate_sms2/api/auth.jsp?msisdn=923468215637&password=Pakistan1@edhi@karachi';
  return axios.post(auth_url);    
  
  };
  

export function getBankById(id) {
   console.log("salarypolicy id", id)
  return axios.post(`${USERS_URL}/salarypolicy/read-salarypolicy`, id);
}

//Update
export function updateSalarypolicy(bank) {
   console.log("updateUser 12", bank)
  return axios.put(`${USERS_URL}/salarypolicy/update-salarypolicy`, bank);
}

//Delete
export function deleteSalarypolicy(body) {
  console.log("body")
  console.log(body);
  return axios.patch(`${USERS_URL}/salarypolicy/delete-salarypolicy`, body);
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
