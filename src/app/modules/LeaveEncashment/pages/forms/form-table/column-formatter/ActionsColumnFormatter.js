import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  {
    payrollData,
    editRecord,
    openDeleteFormDialog,
    isAccessForDelete,
  }
) {

  //Function to check if the date doesn't lie before the payroll month date
  const checkPayrolMonth = (row, payroll) => {
    return payroll && payroll.startDate && new Date(payroll.startDate).getTime() <= new Date(row.createdAt).getTime();
  }

  return (
    <>

      <OverlayTrigger
        overlay={<Tooltip id="products-edit-tooltip">View</Tooltip>}>
        <a
          title=""
          className="btn btn-icon view-button"
          onClick={() => editRecord(row.Id)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/view.svg")}
            />
          </span>
        </a>
      </OverlayTrigger>

      {isAccessForDelete && checkPayrolMonth(row, payrollData) &&
        (
          <OverlayTrigger
            overlay={
              <Tooltip id="products-edit-tooltip">
                Delete
              </Tooltip>
            }
          >
            {row.isActive &&
              (
                <a
                  title=""
                  className="btn btn-icon delete-button"
                  onClick={() => openDeleteFormDialog(row.Id)}
                >
                  <span className="svg-icon svg-icon-md svg-icon-danger">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/General/disable.svg")}
                      title=""
                    />
                  </span>
                </a>
              )

            }
          </OverlayTrigger>
        )}
    </>
  );
}
