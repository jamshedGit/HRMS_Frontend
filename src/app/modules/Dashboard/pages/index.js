import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { DashboardPage } from "./dashboard/DashboardPage";

export function Dashboard() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/dashboard" to="/dashboard/vehicle" />}
        <ContentRoute path="/dashboard/vehicle" component={DashboardPage} />
      </Switch>
    </Suspense>
  );
}
