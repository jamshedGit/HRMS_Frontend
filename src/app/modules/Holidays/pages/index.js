import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { FormPage } from "./holidays/FormPage";

export default function HolidaysManagement() {
 console.log("HolidaysManagement")
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      {/* <>
      hiii
      </> */}
      <Switch>
        {<Redirect exact={true} from="/holidays" to="/holidays/read-all-holidays" />}
        <ContentRoute path="/holidays/read-all-holidays" component={FormPage} />
      </Switch>
    </Suspense>
  );
}
