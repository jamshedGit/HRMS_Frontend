import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { TripLogTable } from "./TripLogTable"
import { IncidentEditDialogHeader } from "./IncidentEditDialogHeader";
import { useIncidentsUIContext } from "../IncidentsUIContext";
import * as actions from "../../../_redux/incidents/incidentActions";

import BootstrapTable from "react-bootstrap-table-next";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as columnFormatters from "../incidents-table/column-formatter";
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

export function TripLogDialog({ id, show, onHide, userForRead }) {
  const classes = useStyles();
  const incidentsUIContext = useIncidentsUIContext();
  const incidentsUIProps = useMemo(() => {
    return {
      initIncident: incidentsUIContext.initIncident,
      queryParams: incidentsUIContext.queryParams,
    };
  }, [incidentsUIContext]);

  const dispatch = useDispatch();
  const { tripLog } = useSelector(
    (state) => ({ tripLog: state?.incidentDetails?.TripLog }),
    shallowEqual
  );

  const columns = [
    {
      dataField: "center.name",
      text: "Center",
    },
    {
      dataField: "status",
      text: "Status",
    },
    {
      dataField: "vehicle.regNo",
      text: "RegistrationNo",
    },
    {
      dataField: "driver.phNo",
      text: "DriverPhoneNo",
    },
    {
      dataField: "driver.firstName",
      text: "DriverName",
    },
    {
      dataField: "logBookNo",
      text: "LogBook",
    },
    {
      dataField: "dateTime",
      text: "DateTime",
      formatter: columnFormatters.DatetimeColumnFormatter,

    },
    {
      dataField: "initialReading",
      text: "initialReading",
    },
    {
      dataField: "finalReading",
      text: "FinalReading",
    },
    
  ];

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <IncidentEditDialogHeader id={id} isUserForRead={userForRead} />
      {!tripLog ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <BootstrapTable keyField="id" data={tripLog} columns={columns} />
        </>
      )}
    </Modal>
  );
}
