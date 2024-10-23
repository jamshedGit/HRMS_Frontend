import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,

  {
    openEditUserDialog,
    openDeleteUserDialog,
    openReadUserDialog,
    openTripLogDialog,
    isAccessForEdit,
    isAccessForDelete,
  }
) {
  const isUserRead = false;
  // const { userAccess } = useSelector(
  //   (state) => ({
  //     userAccess: state.auth.userAccess,
  //   }),
  //   shallowEqual
  // )

  // const isAccessForEdit = userAccess.find(
  //   (item) => item.componentName === "UpdateUser"
  // )

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="products-edit-tooltip">Read Incident</Tooltip>}
      >
        <a
          title=""
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={() => openReadUserDialog(row.id, isUserRead)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/view.svg")}
            />
          </span>
        </a>
      </OverlayTrigger>
      {isAccessForEdit && row.status !== "Close" && (
        <OverlayTrigger
          overlay={<Tooltip id="products-edit-tooltip">Edit Incident</Tooltip>}
        >
          <a
            title=""
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => openEditUserDialog(row.id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
              />
            </span>
          </a>
        </OverlayTrigger>
      )}

      <> </>
      {/* {isAccessForDelete && (
        <OverlayTrigger
          overlay={
            <Tooltip id="products-edit-tooltip">Delete Incident</Tooltip>
          }
        >
          <a
            title=""
            className="btn btn-icon btn-light btn-hover-danger btn-sm"
            onClick={() => openDeleteUserDialog(row.id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-danger">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
                title=""
              />
            </span>
          </a>
        </OverlayTrigger>
      )} */}

      <OverlayTrigger
        overlay={<Tooltip id="products-edit-tooltip">View Trip Log</Tooltip>}
      >
        <a
          title=""
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={() => openTripLogDialog(row.id)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            TRIP
            {/* <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/view.svg")}
            /> */}
          </span>
        </a>
      </OverlayTrigger>
    </>
  );
}
