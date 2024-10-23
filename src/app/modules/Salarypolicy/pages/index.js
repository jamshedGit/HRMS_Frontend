import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { BanksPage } from "./banks/BanksPage";

export default function BankManagement() {
  console.log('Bank mein aya')
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/salarypolicy" to="/salarypolicy/read-all-salarypolicy" />}
        <ContentRoute path="/salarypolicy/read-all-salarypolicy" component={BanksPage} />
      </Switch>
    </Suspense>
  );
}
