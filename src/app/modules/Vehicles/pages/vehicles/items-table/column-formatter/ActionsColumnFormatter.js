import React from "react";
import SVG from "react-inlinesvg";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  {
    openEditCenterDialog,
    openDeleteCenterDialog,
    openActiveDialog,
    openReadCenterDialog,
    isAccessForEdit,
    isAccessForDelete,
  }
) {
  const isUserRead = false;
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="products-edit-tooltip">Read Vehicle</Tooltip>}
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
      {isAccessForEdit && row.isActive && (
        <OverlayTrigger
          overlay={<Tooltip id="products-edit-tooltip">Edit Vehicle</Tooltip>}
        >
          <a
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

      {isAccessForDelete &&
        (row?.isActive ? (
          <OverlayTrigger
            overlay={
              <Tooltip id="products-edit-tooltip">Mark Deactivate</Tooltip>
            }
          >
            <a
              className="btn btn-icon btn-light btn-hover-danger btn-sm"
              onClick={() => openDeleteCenterDialog(row.id)}
            >
              <span className="svg-icon svg-icon-md svg-icon-danger">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/disable.svg")}
                />
              </span>
            </a>
          </OverlayTrigger>
        ) : (
          <OverlayTrigger
            overlay={<Tooltip id="products-edit-tooltip">Mark Active</Tooltip>}
          >
            <a
              className="btn btn-icon btn-light btn-hover-danger btn-sm"
              onClick={() => openActiveDialog(row.id)}
            >
              <span className="svg-icon svg-icon-md svg-icon-danger">
                A
                {/* <SVG
                src={toAbsoluteUrl("/media/svg/icons/General/disable.svg")}
              /> */}
              </span>
            </a>
          </OverlayTrigger>
        ))}
    </>
  );
}
