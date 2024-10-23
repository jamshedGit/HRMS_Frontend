import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { UsersPage } from "./users/UsersPage";

export default function ReceiptManagement() {

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/edrs" to="/edrs/read-all-receipt" />}
        <ContentRoute path="/edrs/read-all-receipt" component={UsersPage} />
      </Switch>
    </Suspense>
  );
}
