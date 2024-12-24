import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL;

/**
 * 
 * Get All Payroll Register Data Paginated
 * 
 * @param {Object} body 
 * @returns res
 */
export async function getAllPayrollRegisterSetup(body) {
  return axios.post(`${USERS_URL}/payroll_register/read-all-registered-payroll`, body);
}

/**
 * 
 * Get All Payroll Register Data For Pdf
 * 
 * @param {Object} body 
 * @returns res
 */
export async function getAllPayrollRegisterForPdf(body) {
  return axios.post(`${USERS_URL}/payroll_register/read-all-registered-payroll-pdf-data`, body,{
    responseType:'arraybuffer'
  });
}