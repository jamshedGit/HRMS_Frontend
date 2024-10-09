import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { FormPage } from "./salarypolicy/FormPage";

export default function SalarypolicyManagement() {
 
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact={true} from="/tax_slab" to="/tax_slab/read-all-tax-slab" />}
        <ContentRoute path="/tax_slab/read-all-tax-slab" component={FormPage} />
      </Switch>
    </Suspense>
  );
}
