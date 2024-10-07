import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { SalarypolicyPage } from "./banks/SalarypolicyPage";

export default function BankManagement() {
  console.log('Bank mein aya')
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/salarypolicy" to="/salarypolicy/read-all-salarypolicy" />}
        <ContentRoute path="/salarypolicy/read-all-salarypolicy" component={SalarypolicyPage} />
      </Switch>
    </Suspense>
  );
}
