/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */
// React import 
import React from "react"
import { Redirect, Switch, Route } from "react-router-dom"
import { shallowEqual, useSelector } from "react-redux"
import { Layout } from "../_metronic/layout"
import BasePage from "./BasePage"
import { Logout, AuthPage } from "./modules/Auth"
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage"

export function Routes() {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  )

  const auth = useSelector(({ auth }) => auth, shallowEqual)

   console.log("Routes, Auth: ", auth)
  // // const isAuthorized = false
   console.log("Login, IsAuthorized: ", { isAuthorized })
  return (
    <Switch>
      {!isAuthorized ? (
        <Route>
          <AuthPage />
        </Route>
      ) : (
        <Redirect from="/auth" to="/" />
      )}

      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />

      {!isAuthorized ? (
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
      {/* <Layout>
        <BasePage />
      </Layout> */}
    </Switch>
  )
}
