import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { ItemPage } from "./vehicles";

export default function VehicleManagment() {
  // const { auth } = useSelector((auth) => auth)
  // const { userAccess } = auth
  // const isAll = userAccess["Settings"]?.find(
  //   (access) => access.resourceId === 2
  // )
  //   ? true
  //   : false

  // if (!isAll) {
  //   return <></>
  // }

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {/* <ContentRoute path="/" component={UsersPage} /> */}
        {
          <Redirect
            exact={true}
            from="/vehicles"
            to="/vehicles/read-all-vehicles"
          />
        }
        <ContentRoute path="/vehicles/read-all-vehicles" component={ItemPage} />
      </Switch>
    </Suspense>
  );
}
