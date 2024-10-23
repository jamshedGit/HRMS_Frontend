import React, { useEffect, useMemo } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls"
import * as actions from "../../../_redux/incidents/incidentActions"
import { useIncidentsUIContext } from "../IncidentsUIContext"

export function IncidentDeleteDialog({ id, show, onHide }) {
  // Customers UI Context
  const incidentsUIContext = useIncidentsUIContext()
  const incidentsUIProps = useMemo(() => {
    return {
      queryParams: incidentsUIContext.queryParams,
    }
  }, [incidentsUIContext])

  // Customers Redux state
  const dispatch = useDispatch()
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.customers.actionsLoading }),
    shallowEqual
  )

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch])

  const deleteIncident = () => {
    // server request for deleting customer by id
    dispatch(actions.deleteIncident(id)).then(() => {
      onHide()
      // refresh list after deletion
      dispatch(actions.fetchIncidents(incidentsUIProps.queryParams))
      // clear selections list
      // usersUIProps.setIds([]);
      // closing delete modal
    })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Incident Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this Incident?</span>
        )}
        {isLoading && <span>incident is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            className="btn btn-primary btn-elevate"
            onClick={deleteIncident}
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
