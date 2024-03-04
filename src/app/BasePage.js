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
const VehicleManagment = lazy(() => import("./modules/Vehicles/pages"));
const IncidentDetailsManagment = lazy(() =>
  import("./modules/IncidentDetails/pages")
);
const UserManagment = lazy(() => import("./modules/UserMangement/pages"));
const Centers = lazy(() => import("./modules/Centers/pages"));
const IBSModule = lazy(() => import("./modules/IBS/pages/index"));
const EDRSModule = lazy(() => import("./modules/EDRS/pages/index"));
const ROUTES = {
  settings: SettingsPage,
  users: UserManagment,
  centers: Centers,
  vehicles: VehicleManagment,
  incidentdetails: IncidentDetailsManagment,
  ibs: IBSModule,
  edrs: EDRSModule
};

export default function BasePage() {
  const dispatch = useDispatch();
  dispatch(fetchAllCountry());
  dispatch(incidentTypes());
  const auth = useSelector(({ auth }) => auth, shallowEqual);
  const UserAccess = auth?.userAccess;
  const SettingsAccess = auth?.userAccess?.Settings;
  const isDashboardAccess = SettingsAccess?.some((obj) =>
    Object.values(obj).includes("read-all-vehicles-dashboard")
  );
  console.log("auth", auth);
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Route path='vehicles/read-all-vehicles' component={VehicleManagment} />
        {Object.keys(UserAccess).map((access, key) => {
          const accessName = access.replace(/ /g, "").toLowerCase();
          const path = access
            .split(" ")
            .join("-")
            .toLowerCase();
          console.log("path", path);

          if (ROUTES[accessName])
            return (
              <Route
                key={key}
                path={`/${path}`}
                component={ROUTES[accessName]}
              />
            );
        })}

        {isDashboardAccess ? (
          <>
            {<Redirect exact from="/" to="/dashboard" />}
            <ContentRoute path="/dashboard" component={Dashboard} />
          </>
        ) : (
          <>
            {<Redirect exact from="/" to="/ibs" />}
            <ContentRoute path="/ibs" component={IBSModule} />
          </>
        )}

        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
