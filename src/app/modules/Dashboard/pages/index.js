import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { DashboardPage } from "./dashboard/DashboardPage";

// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

export function Dashboard() {
  return (
    <> 
    <div>test 5345</div>
    <Suspense fallback={<LayoutSplashScreen />}>
      {/* <Switch>
        {<Redirect exact={true} from="/dashboard" to="/dashboard/vehicle" />}
        <ContentRoute path="/dashboard/vehicle" component={DashboardPage} />
      </Switch> */}
     
    </Suspense></>
  );
}
