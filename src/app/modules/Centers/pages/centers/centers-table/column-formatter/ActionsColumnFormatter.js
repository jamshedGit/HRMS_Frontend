import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,

  {
    openEditCenterDialog,
    openDeleteCenterDialog,
    openActiveCenterDialog,
    openReadCenterDialog,
    isAccessForEdit,
    isAccessForDelete,
  }
) {
  const isUserRead = false;
  // const { userAccess } = useSelector(
  //   (state) => ({
  //     userAccess: state.auth.userAccess.Users,
  //   }),
  //   shallowEqual
  // )

  // // const isAccessForEdit = userAccess.find(
  // //   (item) => item.componentName === "UpdateUser"
  // // )
  // console.log("userAccess", userAccess)
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="products-edit-tooltip">Read Center</Tooltip>}
      >
        <a
          // title="Read User"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={() => openReadCenterDialog(row.id, isUserRead)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/view.svg")}
            />
          </span>
        </a>
      </OverlayTrigger>
      {isAccessForEdit && (
        <OverlayTrigger
          overlay={<Tooltip id="products-edit-tooltip">Edit Center</Tooltip>}
        >
          <a
            // title="Edit Center"
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => openEditCenterDialog(row.id)}
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
      {isAccessForDelete && (
        <OverlayTrigger
          overlay={
            <Tooltip id="products-edit-tooltip">
              {row.isActive ? "Mark Deactivate" : "Mark Active"}
            </Tooltip>
          }
        >
          {row.isActive ? (
            <a
              title=""
              className="btn btn-icon btn-light btn-hover-danger btn-sm mx-3"
              onClick={() => openDeleteCenterDialog(row.id, row.isActive)}
            >
              <span className="svg-icon svg-icon-md svg-icon-danger">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/disable.svg")}
                  title=""
                />
              </span>
            </a>
          ) : (
            <a
              title=""
              className="btn btn-icon btn-light btn-hover-success btn-sm mx-3"
              onClick={() => openActiveCenterDialog(row.id, row.isActive)}
            >
              <span className="svg-icon svg-icon-md svg-icon-success">A</span>
            </a>
          )}
        </OverlayTrigger>
      )}
    </>
  );
}
