import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

//Create user
export function createEmployee_Salary(body) {
  console.log("create earning step 1", body)
  
  // body.Name = body.txtEarningName;
  // delete body.txtEarningName

  return axios.post(`${USERS_URL}/employee_salary/create-employee-salary`, body);
}


// Read
export function getAllEmployee_Salary(body) {
  
  return axios.post(`${USERS_URL}/employee_salary/read-all-employee-salary`, body);
}



export function getEmployee_SalaryById(id) {
   console.log(" earning id", id)
  return axios.post(`${USERS_URL}/employee_salary/read-employee-salary`, id);
}

//Update
export function updateEmployee_Salary(earning) {
   console.log("earning 12", earning)
  return axios.put(`${USERS_URL}/employee_salary/update-employee-salary`, earning);
}

//Delete
export function deleteEmployee_Salary(body) {
  
  return axios.patch(`${USERS_URL}/employee_salary/delete-employee-salary`, body);
}


