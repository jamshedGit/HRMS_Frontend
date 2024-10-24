import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { usersSlice } from "../app/modules/UserMangement/_redux/usersSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import { rolesSlice } from "../app/modules/Settings/_redux/roles/rolesSlice";


import { dashboardSlice } from "../app/modules/Dashboard/_redux/dashboardSlice";

import { bankSlice } from "../app/modules/Banks/_redux/bankSlice";

import { tax_slabSlice } from "../app/modules/Tax_Slab/_redux/redux-Slice";
import { branchSlice } from "../app/modules/BankBranch/_redux/branchSlice";
import { deptSlice } from "../app/modules/Department/_redux/deptSlice";
import { empTypeSlice } from "../app/modules/EmployeeType/_redux/employeeTypeSlice";
import { religionSlice } from "../app/modules/Religion/_redux/religionSlice";
import { regionSlice } from "../app/modules/Region/_redux/regionSlice";
import { designationSlice } from "../app/modules/Designation/_redux/designationSlice";
import { formSlice } from "../app/modules/Forms/_redux/formsSlice";
import { formDetailsSlice } from "../app/modules/FormDetails/_redux/formdetailsSlice";
import { empPolicySlice } from "../app/modules/EmployeePolicy/_redux/employeePolicySlice";
import { policySlice } from "../app/modules/Policy/_redux/policySlice";
import { empProfileSlice } from "../app/modules/EmployeeProfile/_redux/employeeProfileSlice";
import { contactSlice } from "../app/modules/Contact/_redux/contactSlice";
import { academicSlice } from "../app/modules/Academic/_redux/academicSlice";
import { experienceSlice } from "../app/modules/Experience/_redux/experienceSlice";
import { skillslice } from "../app/modules/Skills/_redux/skillSlice";
import { incidentSlice } from "../app/modules/incident/_redux/incidentSlice";
import { earningSlice } from "../app/modules/Eearning/_redux/earningSlice";
import { deductionSlice } from "../app/modules/Deduction/_redux/deductionSlice";
import { stoppageAllowanceSlice } from "../app/modules/StoppageAllowance/_redux/stoppageAllowanceSlice";
import { exchangeRateSlice } from "../app/modules/ExchangeRate/_redux/exchangeRateSlice";
import { compensationBenefitsSlice } from "../app/modules/compensation_benefits/_redux/compensationBenefitsSlice";
import { earning_transactionSlice } from "../app/modules/Compensation_Earning_Transaction/_redux/earning_transactionSlice";
import { deduction_transactionSlice } from "../app/modules/Compensation_Deduction_Transaction/_redux/deduction_transactionSlice";
import { employeeSalaryEarningSlice } from "../app/modules/Employee_Salary_Earning/_redux/employeeSalaryEarningSlice";
import { employeeSalary_DeductionSlice } from "../app/modules/Employee_Salary_Deduction/_redux/employeeSalary_DeductionSlice";
import { employeeSalarySlice } from "../app/modules/Employee_Salary_Setup/_redux/employeeSalarySlice";
import { employeeSalaryExpSlice } from "../app/modules/Employee_Salary_Expatriate/_redux/employeeSalaryExpSlice";
import { compensationExpSlice } from "../app/modules/Compensation_Expatriate/_redux/compensationExpSlice";
import { employee_transfer_slice } from "../app/modules/Employee_Transfer/_redux/employee_transfer_slice";
import { SalaryRevisionSlice } from "../app/modules/Employee_Salary_Revision/_redux/SalaryRevisionSlice";

import { fiscalSetupSlice } from "../app/modules/Fiscal_Setup/_redux/fiscalSetupSlice";
import { PayrollMonthSlice } from "../app/modules/Payroll_Month_Setup/_redux/PayrollMonthSlice";
import { ArrearSetupSlice } from "../app/modules/ArrearPolicy/_redux/arrearPolicySlice";
import { SalaryRoundingPolicySlice } from "../app/modules/SalaryRoundingPolicy/_redux/salaryRoundingPolicySlice";
import { LeaveTypeSlice } from "../app/modules/LeaveType/_redux/leaveTypeSlice";
import { FinalSettlementPolicySlice } from "../app/modules/Final_Settlement_Policy/_redux/FinalSettlementPolicySlice";
import { salarypolicySlice } from "../app/modules/Salarypolicy/_redux/salarypolicySlice";
import { OnetimeAllowanceSlice } from "../app/modules/Onetime_Allowance/_redux/OnetimeAllowanceSlice";
import { LoanTypeSlice } from "../app/modules/LoanType/_redux/LoanTypeSlice";
import { leaveManagementConfigurationSlice } from "../app/modules/leaveManagementConfiguration/_redux/leaveManagementConfigurationSlice";
import { payroll_policySlice } from "../app/modules/Payroll_Process_Policy/_redux/payroll_policySlice";
import { taxSetupSlice } from "../app/modules/Tax_Setup/_redux/taxSetupSlice";
import { loan_manag_confSlice } from "../app/modules/Loan_manag_conf/_redux/redux-Slice"

import {gratuity_configurationSlice} from "../app/modules/Gratuity_Configuration/_redux/redux-Slice"
import {accrue_gratuity_configurationSlice} from "../app/modules/Accrue_Gratuity_Configuration/_redux/redux-Slice"
export const rootReducer = combineReducers({
  auth: auth.reducer,
  dashboard: dashboardSlice.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  users: usersSlice.reducer,
  roles: rolesSlice.reducer,

  bank: bankSlice.reducer,
  branch: branchSlice.reducer,
  dept: deptSlice.reducer,
  empType: empTypeSlice.reducer,
  religion: religionSlice.reducer,
  region: regionSlice.reducer,
  designation:designationSlice.reducer,
  form: formSlice.reducer,
  formDetails: formDetailsSlice.reducer,
  emppolicy: empPolicySlice.reducer,
  policy: policySlice.reducer,
  profile: empProfileSlice.reducer,
  contact: contactSlice.reducer,
  academic: academicSlice.reducer,
  experience: experienceSlice.reducer,
  skills: skillslice.reducer,
  incident: incidentSlice.reducer,
  earning: earningSlice.reducer,
  deduction:deductionSlice.reducer,
  stoppage: stoppageAllowanceSlice.reducer,
  exchange: exchangeRateSlice.reducer,
  compensation: compensationBenefitsSlice.reducer,
  earning_transaction:earning_transactionSlice.reducer,
  deduction_transaction:deduction_transactionSlice.reducer,
  employee_salary_earning: employeeSalaryEarningSlice.reducer,
  employee_salary_deduction:employeeSalary_DeductionSlice.reducer,
  employee_salary: employeeSalarySlice.reducer,
  salary_expatriate: employeeSalaryExpSlice.reducer,
  compensation_expatriate: compensationExpSlice.reducer,
  employee_transfer: employee_transfer_slice.reducer,
  salary_revision: SalaryRevisionSlice.reducer,
  tax_setup: taxSetupSlice.reducer,
  fiscal_setup: fiscalSetupSlice.reducer,
  payroll_month:PayrollMonthSlice.reducer,
  arrear_policy: ArrearSetupSlice.reducer,
  salary_rounding_policy: SalaryRoundingPolicySlice.reducer,
  leave_type: LeaveTypeSlice.reducer,
  final_settlement_policy: FinalSettlementPolicySlice.reducer,
  salary_policy: salarypolicySlice.reducer,
  onetime_earning: OnetimeAllowanceSlice.reducer,
  loan_type: LoanTypeSlice.reducer,
  leave_management_configuration: leaveManagementConfigurationSlice.reducer,
  payroll_process_policy: payroll_policySlice.reducer,
  tax_slab:tax_slabSlice.reducer,
  loan_management_configuration:loan_manag_confSlice.reducer,
  gratuity_configuration:gratuity_configurationSlice.reducer,
  accrue_gratuity_configuration:accrue_gratuity_configurationSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
