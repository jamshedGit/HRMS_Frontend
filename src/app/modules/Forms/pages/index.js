import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { FormPage } from "./form/FormPage";

export default function FormManagement() {
  console.log('forms menu mein aya')
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/form" to="/form/read-all-form" />}
        <ContentRoute path="/form/read-all-form" component={FormPage} />
      </Switch>
    </Suspense>
  );
}
