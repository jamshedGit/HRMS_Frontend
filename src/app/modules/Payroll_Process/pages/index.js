import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { FormPage } from "./payroll_process/FormPage";

export default function payroll_processManagement() {

  return (
    <Suspense fallback={<LayoutSplashScreen />}>

      <Switch>
        {<Redirect exact={true} from="/payroll_process" to="/payroll_process/read-all-payroll-process" />}
        <ContentRoute path="/payroll_process/read-all-payroll-process" component={FormPage} />
      </Switch>
    </Suspense>
  );
}
