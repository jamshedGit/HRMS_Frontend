import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import { FormPage } from "./employee_profile/FormPage";
import { useSelector, shallowEqual } from "react-redux"



export default function employee_profile() {
console.log("hII1")
  return (

    <>
   
    
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
    
        {<Redirect exact={true} from="/employee_profile" to="/employee_profile/read-all-employee-profile" />}
        <ContentRoute path="/employee_profile/read-all-employee-profile" component={FormPage} />
      </Switch>
    </Suspense>
    
    </>
  );
}
