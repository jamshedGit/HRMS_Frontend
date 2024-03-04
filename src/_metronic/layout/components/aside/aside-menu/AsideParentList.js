import React from "react";
import { NavLink } from "react-router-dom";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { useLocation } from "react-router";
import AsideMenuItem from "./AsideMenuItems";
import SVG from "react-inlinesvg";
import { shallowEqual, useSelector } from "react-redux";

export default function AsideparentList(props) {
  const auth = useSelector(({ auth }) => auth, shallowEqual);
  const UserAccess = auth?.userAccess;
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };
  return (
    <>
      <li
        className={`menu-item menu-item-submenu ${getMenuItemActive(
          "/props.element",
          true
        )}`}
        aria-haspopup="true"
        data-menu-toggle="hover"
      >
        <NavLink className="menu-link menu-toggle" to={`/${props.element}`}>
          <span className="svg-icon menu-icon">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Box2.svg")} />
          </span>
          <span className="menu-text">{props.element}</span>
          <i className="menu-arrow" />
        </NavLink>
        <div className="menu-submenu ">
          <ul className="menu-subnav">
            <ul className="menu-subnav">
              {UserAccess[props.element].map((ce) => {
                return <AsideMenuItem element={ce} key={ce.resourceId} />;
              })}
            </ul>
          </ul>
        </div>
      </li>
    </>
  );
}
