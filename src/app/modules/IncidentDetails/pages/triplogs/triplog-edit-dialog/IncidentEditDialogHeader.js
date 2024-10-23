import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import moment from "moment";

export function IncidentEditDialogHeader({ id, isUserForRead }) {
  //const userForEdit = false
  const [title, setTitle] = useState("");

  const { driverTripForEdit, actionsLoading } = useSelector(
    (state) => ({
      driverTripForEdit: state.triplogs?.driverTripForEdit,
      actionsLoading: state.triplogs?.actionsLoading,
    }),
    shallowEqual
  );

  const { createdAt } = driverTripForEdit;

  const startTime = moment(createdAt);
  const currentTime = moment();

  const duration = moment.duration(currentTime.diff(startTime));

  const hours = duration.hours();
  const checkTime = hours > 0;
  const minutes = duration.minutes();

  const tripDuration = ` ${
    checkTime ? `${hours} hours and ${minutes} minutes` : `${minutes} minutes`
  }`;

  useEffect(() => {
    let _title = id ? "" : "Add Incident";
    if (driverTripForEdit) {
      _title = `Close Trip`;
    }
    setTitle(_title);
  }, [driverTripForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Trip Duration is <small>{tripDuration}</small>
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
