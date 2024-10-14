import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { SalarypolicyPage } from "./salarypolicy/SalarypolicyPage";

export default function SalarypolicyManagement() {
 
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/salarypolicy" to="/salarypolicy/read-all-salarypolicy" />}
        <ContentRoute path="/salarypolicy/read-all-salarypolicy" component={SalarypolicyPage} />
      </Switch>
    </Suspense>
  );
}
