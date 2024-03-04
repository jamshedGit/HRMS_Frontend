import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,

  {
    openEditDialog,
    openDeleteDialog,
    openActiveDialog,
    openReadDialog,
    openMortuaryDialog,
    openMortuaryEditDialog,
    isAccessForEdit,
    isAccessForDelete,
    isAccessForMortuary,
  }
) {
  const isUserRead = false;
  // console.log("Row", row);
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="products-edit-tooltip">Read</Tooltip>}
      >
        <a
          // title="Read User"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1"
          onClick={() => openReadDialog(row.id, isUserRead)}
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
          overlay={<Tooltip id="products-edit-tooltip">Edit</Tooltip>}
        >
          <a
            // title="Edit Center"
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1"
            onClick={() => openEditDialog(row.id)}
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
              className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
              onClick={() => openDeleteDialog(row.id, row.isActive)}
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
              className="btn btn-icon btn-light btn-hover-success btn-sm mx-1"
              onClick={() => openActiveDialog(row.id, row.isActive)}
            >
              <span className="svg-icon svg-icon-md svg-icon-success">A</span>
            </a>
          )}
        </OverlayTrigger>
      )}
      <></>
      {isAccessForMortuary &&
        row.isActive &&
        row.statusId != 3 &&
        row.relatedMortuaryForm == null && (
          <OverlayTrigger
            overlay={
              <Tooltip id="products-edit-tooltip">Open Mortuary</Tooltip>
            }
          >
            <a
              title=""
              className="btn btn-icon btn-light btn-hover-success btn-sm mx-1"
              onClick={() => openMortuaryDialog(row.id)}
            >
              <span className="svg-icon svg-icon-md svg-icon-success">M</span>
            </a>
          </OverlayTrigger>
        )}

      {row.relatedMortuaryForm && row.isActive && (
        <OverlayTrigger
          overlay={<Tooltip id="products-edit-tooltip">Edit Mortuary</Tooltip>}
        >
          <a
            title=""
            className="btn btn-icon btn-light btn-hover-success btn-sm mx-1"
            onClick={() => openMortuaryEditDialog(row?.relatedMortuaryForm?.id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-success">Edit</span>
          </a>
        </OverlayTrigger>
      )}
    </>
  );
}
