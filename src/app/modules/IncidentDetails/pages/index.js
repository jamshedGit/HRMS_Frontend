import React, { Suspense } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout"
import { IncidentsPage } from "./incidents/IncidentsPage"
import { TriplogPage } from "./triplogs/TripLogsPage"

export default function IncidentDetailsManagment() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {/* <ContentRoute path="/" component={UsersPage} /> */}
        {
          <Redirect
            exact={true}
            from="/incident-details"
            to="/read-all-incident-details"
          />
        }
        <ContentRoute
          path="/incident-details/read-all-incident-details"
          component={IncidentsPage}
        />
        <ContentRoute
          path="/incident-details/read-all-driver-trip-logs"
          component={TriplogPage}
        />
      </Switch>
    </Suspense>
  )
}
