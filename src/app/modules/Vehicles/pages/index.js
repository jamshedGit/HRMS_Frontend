import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { ItemPage } from "./vehicles";

export default function VehicleManagment() {
  // const { auth } = useSelector((auth) => auth)
  // console.log("UserManagement, Auth: ", auth)
  // const { userAccess } = auth
  // console.log("UserManagement, userAccess: ", userAccess)
  // const isAll = userAccess["Settings"]?.find(
  //   (access) => access.resourceId === 2
  // )
  //   ? true
  //   : false
  // console.log("UserManagement, isAll: ", isAll)

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
