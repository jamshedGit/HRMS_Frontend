/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

export function AuthPage() {
  return (
    <>
      <div
        className="d-flex flex-column flex-root"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-4.png")})`,
        }}
      >
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"
          style={{
            height: "100vh", // Full height of the viewport
            width: "100%", // Full width of the viewport
            // backgroundImage: 'linear-gradient(to bottom, rgb(36, 144, 207), rgb(13, 114, 185)',  // Linear gradient background
            backgroundImage: `url(${toAbsoluteUrl("/media/bg/login-bg.png")})`,
            backgroundSize: "cover", // Ensures the gradient covers the entire area
            backgroundPosition: "center", // Ensures the background is centered
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

          {/* left side */}

          <div className="login-left-container d-none d-lg-block">
            <div
              className="login-left-container-inner"
              style={{
                width: "50vw",
              }}
            >
              <div
                className="login-left-container-inner-img"
                style={{
                  backgroundImage: `url(${toAbsoluteUrl(
                    "/media/bg/login-pic.png"
                  )})`,
                  backgroundSize: "cover", // Ensures the gradient covers the entire area
                  backgroundPosition: "center", // Ensures the background is centered
                }}
              ></div>
              <div className="login-left-container-inner-bottom-img">
                <div className="login-left-container-inner-bottom-img1 mt-5">
                  <img
                    src="/media/bg/partner-logo.png"
                    alt="Partner Logo"
                    style={{
                      width: "100%", // Ensure the image takes full width of the container
                      height: "100%", // Ensure the image takes full height of the container
                      objectFit: "cover", // Ensures the image covers the container while maintaining aspect ratio
                      objectPosition: "center", // Ensures the image stays centered if it gets cropped
                    }}
                  />


                </div>



                <div className="login-left-container-inner-bottom-img2">
                  <div className="login-left-container-inner-bottom-img2-heading">
                    <h1>Our Technology Partners</h1>
                  </div>


                  <div className="login-left-container-inner-bottom-img2-container ">
                    <img
                      src="/media/bg/tech-partner1.png"
                      alt="Partner Logo"
                      className="partner-image"

                    />

                    <img
                      src="/media/bg/tech-partner2.png"
                      alt="Partner Logo"
                      className="partner-image"

                    />
                    <img
                      src="/media/bg/tech-partner3.png"
                      alt="Partner Logo"
                      className="partner-image"

                    />
                    <img
                      src="/media/bg/tech-partner4.png"
                      alt="Partner Logo"
                      className="partner-image"

                    />
                  </div>
                </div>

              </div>







            </div>

            <footer className="d-flex gap-4  login-left-footer justify-content-between p-4 pl-0">
              <div>
               <div className="mt-4">
               <img
                      src="/media/bg/facebook-logo.png"
                      alt="Partner Logo"
                      // className="partner-image"
                      className="ml-0" 

                    />
                    <img
                      src="/media/bg/insta-logo.png"
                      alt="Partner Logo"
                      className="ml-4" 

                    />
                    <img
                      src="/media/bg/youtube-logo.png"
                      alt="Partner Logo"
                      className="ml-4" 

                    />
                    <img
                      src="/media/bg/linkedin-logo.png"
                      alt="Partner Logo"
                      className="ml-4" 

                    />
               </div>
              </div>
              <div>
                <p className="mt-5 pr-2">&copy;Copyright © 2024, Powered by Dynasoft Cloud</p>
              </div>


            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
