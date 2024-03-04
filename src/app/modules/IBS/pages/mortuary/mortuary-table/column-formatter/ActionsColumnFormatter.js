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
    openAddCoffinDialog,
    openEditCoffinDialog,
    isAccessForEdit,
    isAccessForDelete,
    isAccessForCoffin,
  }
) {
  const isUserRead = false;
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="products-edit-tooltip">Read Detail</Tooltip>}
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
      {isAccessForEdit && row?.isActive && (
        <OverlayTrigger
          overlay={<Tooltip id="products-edit-tooltip">Edit Detail</Tooltip>}
        >
          <a
            // title="Edit Center"
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1"
            onClick={() => openEditDialog(row.ibfId, row.id)}
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

      {isAccessForCoffin &&
        row?.isActive &&
        (row.statusId === 10 || row.statusId === 9) &&
        row.coffinFormRelatedToMortuaryForm == null && (
          <OverlayTrigger
            overlay={<Tooltip id="products-edit-tooltip">Add Coffin</Tooltip>}
          >
            <a
              title=""
              className="btn btn-icon btn-light btn-hover-success btn-sm mx-1"
              onClick={() => openAddCoffinDialog(row.ibfId, row.id)}
            >
              <span className="svg-icon svg-icon-md svg-icon-success">C</span>
            </a>
          </OverlayTrigger>
        )}

      {isAccessForCoffin &&
        row.isActive &&
        row.coffinFormRelatedToMortuaryForm && (
          <OverlayTrigger
            overlay={<Tooltip id="products-edit-tooltip">Edit Coffin</Tooltip>}
          >
            <a
              title=""
              className="btn btn-icon btn-light btn-hover-success btn-sm mx-1"
              onClick={() =>
                openEditCoffinDialog(row.coffinFormRelatedToMortuaryForm?.id)
              }
            >
              <span className="svg-icon svg-icon-md svg-icon-success">
                Edit
              </span>
            </a>
          </OverlayTrigger>
        )}
    </>
  );
}
