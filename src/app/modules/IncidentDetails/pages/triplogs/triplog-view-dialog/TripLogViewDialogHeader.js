import React, { useState, useEffect } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Modal } from "react-bootstrap"
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls"

export function TripLogViewDialogHeader({ id, isUserForRead }) {
  //const userForEdit = false
  const [title, setTitle] = useState("")

  const { driverTripForEdit, actionsLoading } = useSelector(
    (state) => ({
      driverTripForEdit: state.triplogs.driverTripForEdit,
      actionsLoading: state.triplogs.actionsLoading,
    }),
    shallowEqual
  )
  //console.log(";current state for incident", actionsLoading)
  useEffect(() => {
    let _title = id ? "" : "Add Incident"
    if (driverTripForEdit) {
      _title = `View Trip Log`
    } //else if (isUserForRead) {
    //   _title = `Read user '}'`
    // }
    setTitle(_title)
  }, [driverTripForEdit, actionsLoading])

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  )
}
