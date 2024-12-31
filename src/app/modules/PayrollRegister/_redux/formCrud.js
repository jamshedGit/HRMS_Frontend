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
 * Generate Payslip PDf
 * 
 * @param {Object} body 
 * @returns res
 */
export async function generatePayslip(body) {
  return axios.post(`${USERS_URL}/payroll_register/generate-payslip-pdf`, body,{
    responseType:'arraybuffer'
  });
}