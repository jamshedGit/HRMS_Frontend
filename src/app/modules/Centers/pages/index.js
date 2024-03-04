import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { CentersPage } from "./centers/CentersPage";
import { SubCentersPage } from "./subcenters/CentersPage";

export default function UserManagment() {
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
            from="/centers"
            to="/centers/read-all-centers"
          />
        }
        <ContentRoute
          path="/centers/read-all-centers"
          component={CentersPage}
        />
        <ContentRoute
          path="/centers/read-all-subcenters"
          component={SubCentersPage}
        />
      </Switch>
    </Suspense>
  );
}
