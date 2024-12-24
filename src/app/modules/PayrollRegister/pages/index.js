import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { PayrollRegisterPage } from "./forms/PayrollRegisterPage";

export default function PayrollRegisterManagement() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/payroll_register" to="/payroll_register/read-all-registered-payroll" />}
        <ContentRoute path="/payroll_register/read-all-registered-payroll" component={PayrollRegisterPage} />
      </Switch>
    </Suspense>
  );
}
