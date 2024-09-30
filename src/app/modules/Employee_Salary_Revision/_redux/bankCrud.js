import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createEmployee_Salary(body) {
  console.log("create earning step 1", body)
  
  // body.Name = body.txtEarningName;
  // delete body.txtEarningName

  return axios.post(`${USERS_URL}/salary_revision/create-salary-revision`, body);
}


// Read
export function getAllEmployee_Salary(body) {
  console.log("body",body);
  return axios.post(`${USERS_URL}/salary_revision/read-all-salary-revision`, body);
}



export function getEmployee_SalaryById(id) {
   console.log(" earning id", id)
  return axios.post(`${USERS_URL}/salary_revision/read-salary-revision`, id);
}

//Update
export function updateEmployee_Salary(earning) {
   console.log("earning 12", earning)
  return axios.put(`${USERS_URL}/salary_revision/update-salary-revision`, earning);
}

//Delete
export function deleteEmployee_Salary(body) {
  console.log("body")
  console.log(body);
  return axios.patch(`${USERS_URL}/salary_revision/delete-salary-revision`, body);
}


