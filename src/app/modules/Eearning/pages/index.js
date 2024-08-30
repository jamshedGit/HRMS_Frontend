import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { EarningPage } from "./banks/BanksPage";

export default function EarningManagement() {
  console.log('Earning mein aya')
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/earning" to="/earning/read-all-earning" />}
        <ContentRoute path="/earning/read-all-earning" component={EarningPage} />
      </Switch>
    </Suspense>
  );
}
