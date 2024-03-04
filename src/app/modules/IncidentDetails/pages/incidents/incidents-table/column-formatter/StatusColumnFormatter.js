import React from "react";
import {
  IncidentStatusCssClasses,
  IncidentStatusTitles,
} from "../../IncidentsUIHelpers";
import { getDate } from '../../../../../../utils/common'

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      row.status === "Open" ? "success" : "danger"
    } label-inline`}
  >
    {row.status}
  </span>
  //   <span
  //     className={`label label-lg label-light-${
  //       IncidentStatusCssClasses[row.isActive]
  //     } label-inline`}
  //   >
  //     {IncidentStatusTitles[row.isActive]}
  //   </span>
);

export const DatetimeColumnFormatter = (cellContent, row) => (
  <span
    className={`badge badge-light-success  ${getDate(cellContent)}`}
  >
    {getDate(cellContent)}
  </span>
);
