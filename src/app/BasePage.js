import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import { Dashboard } from "./modules/Dashboard/pages";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
//import { fetchAllCountry } from "./modules/Centers/_redux/centers/centersActions";
import { fetchAllCountry } from "./modules/Dashboard/_redux/dashboardActions";
import { incidentTypes } from "./modules/Dashboard/_redux/dashboardActions";

const SettingsPage = lazy(() =>
  import("./modules/Settings/pages/SettingsPage")
);
// const VehicleManagment = lazy(() => import("./modules/Vehicles/pages"));
// const IncidentDetailsManagment = lazy(() =>
//   import("./modules/IncidentDetails/pages")
// );
const UserManagment = lazy(() => import("./modules/UserMangement/pages"));
// const Centers = lazy(() => import("./modules/Centers/pages"));
// const IBSModule = lazy(() => import("./modules/IBS/pages/index"));
// const EDRSModule = lazy(() => import("./modules/EDRS/pages/index"));
const BankModule = lazy(() => import("./modules/Banks/pages/index"));
const BranchModule = lazy(() => import("./modules/BankBranch/pages/index"));
const DepartmenModule = lazy(() => import("./modules/Department/pages/index"));
const EmployeeTypeModule = lazy(() => import("./modules/EmployeeType/pages/index"));
const ReligionModule = lazy(() => import("./modules/Religion/pages/index"));
const RegionModule = lazy(() => import("./modules/Region/pages/index"));
const DesignationModule = lazy(() => import("./modules/Designation/pages/index"));
const FormModule = lazy(() => import("./modules/Forms/pages/index"));
const FormDetailsModule = lazy(() => import("./modules/FormDetails/pages/index"));
const EmpPolicyModule = lazy(() => import("./modules/EmployeePolicy/pages/index"));
const PolicyModule = lazy(() => import("./modules/Policy/pages/index"));
const EmplpyeeProfileModule = lazy(() => import("./modules/EmployeeProfile/pages/index"));
const ContactModule = lazy(() => import("./modules/Contact/pages/index"));
const AcademicModule = lazy(() => import("./modules/Academic/pages/index"));
const ExperienceModule = lazy(() => import("./modules/Experience/pages/index"));
const SkillsModule = lazy(() => import("./modules/Skills/pages/index"));
const IncidentModule = lazy(() => import("./modules/incident/pages/index"));
const EarningModule = lazy(() => import("./modules/Eearning/pages/index"));
const DeductionModule = lazy(() => import("./modules/Deduction/pages/index"));
const StoppageAllowanceModule = lazy(() => import("./modules/StoppageAllowance/pages/index"));
const ExchangeRateModule = lazy(() => import("./modules/ExchangeRate/pages/index"));
const CompensationBenefitsModule = lazy(() => import("./modules/compensation_benefits/pages/index"));
const EarningDeductionTranModule = lazy(() => import("./modules/Compensation_Earning_Transaction/pages/index"));
const DeductionTranModule = lazy(() => import("./modules/Compensation_Deduction_Transaction/pages/index"));
const EmployeeSalaryEarningModule = lazy(() => import("./modules/Employee_Salary_Earning/pages/index"));
const EmployeeSalaryDeductionModule = lazy(() => import("./modules/Employee_Salary_Deduction/pages/index"));
const EmployeeSalaryModule = lazy(() => import("./modules/Employee_Salary_Setup/pages/index"));
const EmployeeSalaryExpModule = lazy(() => import("./modules/Employee_Salary_Expatriate/pages/index"));
const CompensationExpModule = lazy(() => import("./modules/Compensation_Expatriate/pages/index"));
const EmployeeTransferModule = lazy(() => import("./modules/Employee_Transfer/pages/index"));
const EmployeeSalaryRevisionModule = lazy(() => import("./modules/Employee_Salary_Revision/pages/index"));
const TaxSetupModule = lazy(() => import("./modules/Tax_Setup/pages/index"));
const FiscalSetupModule = lazy(() => import("./modules/Fiscal_Setup/pages/index"));
const PayrollMonthSetupModule = lazy(() => import("./modules/Payroll_Month_Setup/pages/index"));
const ArrearPolicyModule = lazy(() => import("./modules/ArrearPolicy/pages/index"));
const RoundingPolicyModule = lazy(() => import("./modules/SalaryRoundingPolicy/pages/index"));
const LeaveTypeModule = lazy(() => import("./modules/LeaveType/pages/index"));
const FinalSettlementPolicyModule = lazy(() => import("./modules/Final_Settlement_Policy/pages/index"));
const salarypolicyModule = lazy(() => import("./modules/Salarypolicy/pages/index"));
const OnetimeAllowance = lazy(() => import("./modules/Onetime_Allowance/pages/index"));
const LoanType = lazy(() => import("./modules/LoanType/pages/index"));
const TaxSlab = lazy(() => import("./modules/LoanType/pages/index"));
const leaveManagementConfiguration = lazy(() => import("./modules/leaveManagementConfiguration/pages/index"));
const PayrollProcessPolicy = lazy(() => import("./modules/Payroll_Process_Policy/pages/index"));
const LeaveApplication = lazy(() => import("./modules/LeaveApplication/pages/index"));
    

const ROUTES = {
  settings: SettingsPage,
  users: UserManagment,

  // vehicles: VehicleManagment,
  // incidentdetails: IncidentDetailsManagment,
  // ibs: IBSModule,
  // edrs: EDRSModule,
  bank: BankModule,
  branch:BranchModule,
  department:DepartmenModule,
  emptype: EmployeeTypeModule,
  religion: ReligionModule,
  region: RegionModule,
  designation: DesignationModule,
  form: FormModule,
  formdetails: FormDetailsModule,
  emppolicy: EmpPolicyModule,
  policy: PolicyModule,
  profile: EmplpyeeProfileModule,
  contact: ContactModule,
  academic: AcademicModule,
  experience: ExperienceModule ,
  skills: SkillsModule,
  incident: IncidentModule,
  earning: EarningModule,
  deduction: DeductionModule,
  stoppage: StoppageAllowanceModule,
  exchange: ExchangeRateModule,
  compensation: CompensationBenefitsModule,
  earning_transaction:EarningDeductionTranModule,
  deduction_transaction: DeductionTranModule,
  employee_salary_earning : EmployeeSalaryEarningModule,
  employee_salary_deduction: EmployeeSalaryDeductionModule,
  employee_salary : EmployeeSalaryModule,
  salary_expatriate: EmployeeSalaryExpModule,
  compensation_expatriate: CompensationExpModule,
  employee_transfer: EmployeeTransferModule,
  salary_revision: EmployeeSalaryRevisionModule,
  tax_setup: TaxSetupModule,
  fiscal_setup: FiscalSetupModule,
  payroll_month: PayrollMonthSetupModule,
  arrear_policy: ArrearPolicyModule,
  salary_rounding_policy: RoundingPolicyModule,
  leave_type: LeaveTypeModule,
  final_settlement_policy :FinalSettlementPolicyModule,
  salarypolicy:salarypolicyModule,
  onetime_earning: OnetimeAllowance,
  leave_management_configuration: leaveManagementConfiguration,
  loan_type: LoanType,
  tax_slab: TaxSlab  ,
  payroll_process_policy :PayrollProcessPolicy,
  leave_application :LeaveApplication,
};

export default function BasePage() {
  const dispatch = useDispatch();
  dispatch(fetchAllCountry());
  
  const auth = useSelector(({ auth }) => auth, shallowEqual);
  const UserAccess = auth?.userAccess;
  const SettingsAccess = auth?.userAccess?.Settings;
  const isDashboardAccess = SettingsAccess?.some((obj) =>
    Object.values(obj).includes("read-all-vehicles-dashboard")
  );
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {/* <Route path='vehicles/read-all-vehicles' component={VehicleManagment} /> */}
        {Object.keys(UserAccess).map((access, key) => {
          const accessName = access.replace(/ /g, "").toLowerCase();
          const path = access
            .split(" ")
            .join("-")
            .toLowerCase();
            if (ROUTES[accessName])
            {
            return (
              <Route
                key={key}
                path={`/${path}`}
                component={ROUTES[accessName]}
              />
            );
          }
        })}

<>
            {<Redirect exact from="/" to="/dashboard" />}
            <ContentRoute path="/dashboard" component={Dashboard} />
          </>

        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
