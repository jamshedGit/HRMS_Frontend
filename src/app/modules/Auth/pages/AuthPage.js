/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { Link, Switch, Redirect } from "react-router-dom"
import { toAbsoluteUrl } from "../../../../_metronic/_helpers"
import { ContentRoute } from "../../../../_metronic/layout"
import Login from "./Login"
import Registration from "./Registration"
import ForgotPassword from "./ForgotPassword"
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss"

export function AuthPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-4.png")})`,

        }}


      >





        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"

          style={{
            height: '100vh',  // Full height of the viewport
            width: '100%',  // Full width of the viewport
            backgroundImage: 'linear-gradient(to bottom, rgb(36, 144, 207), rgb(13, 114, 185)',  // Linear gradient background
            backgroundSize: 'cover',  // Ensures the gradient covers the entire area
            backgroundPosition: 'center',  // Ensures the background is centered
          }}
        >

          {/* login div */}

          <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">

            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0 p-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>

          </div>

          {/* right side */}

          <div className="d-flex flex-column ">

            <div className="d-flex flex-column-fluid flex-center m-30"
             style={{
              height: "50vh",  // Full height of the viewport
              width: "50vw",  // Make the form take full width
             backgroundColor:"#ffffff"
              
            }}>


<div className=""
      style={{
        height: "50vh",  // Full height of the viewport
        width: "30vw",  // Make the form take full width
        justifyContent: "center",  // Center horizontally
        alignItems: "center",  // Center vertically
        backgroundColor: "white",
        backgroundSize: "cover",  // Ensures the gradient covers the entire area
        backgroundPosition: "center",  // Ensures the background is centered
        padding: "60px",  // Padding inside the form
      }}

    >


      <div
        className="text-center mb-10 mb-lg-20"
       
      >

      </div>

      <div>
       
      </div>
      <br />
      <br />


        <div className="form-group fv-plugins-icon-container">
          
        </div>

        <br />

        <div className="form-group fv-plugins-icon-container">
         
        </div>
        <br />

        <div className="d-flex align-items-center  ">
          
         
        
        </div>
        <br />
        <br />

        <div className="">


        </div>

        <br />
        <div className="d-flex align-items-center  ">

          
        </div>

  
    </div>



            
            </div>

          </div>

        </div>

      </div>
    </>
  )
}
