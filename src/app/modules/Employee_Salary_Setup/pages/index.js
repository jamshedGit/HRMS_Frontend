import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { EmployeeSalarySetupPage } from "./banks/BanksPage";

export default function EmployeeSalaryManagement() {
  console.log('employee salary setup mein aya')
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/employee_salary" to="/employee_salary/read-all-employee-salary " />}
        <ContentRoute path="/employee_salary/read-all-employee-salary" component={EmployeeSalarySetupPage} />
      </Switch>
    </Suspense>
  );
}
