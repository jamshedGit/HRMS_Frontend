import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/vehiclesActions";
import { useItemUIContext } from "../ItemUIContext";

export function ItemDeleteDialog({ id, show, onHide }) {
  // Centers UI Context
  const itemUIContext = useItemUIContext();
  const itemUIProps = useMemo(() => {
    return {
      queryParams: itemUIContext.queryParams,
    };
  }, [itemUIContext]);

  // Customers Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.vehicles.actionsLoading }),
    shallowEqual
  );
  //console.log("isLoading", isLoading)
  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteItem = () => {
    dispatch(actions.deleteVehicle(id)).then(() => {
      onHide();
      dispatch(actions.fetchVehicles(itemUIProps.queryParams));
    });
  };

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
          Deactivate Vehicle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Are you sure to deactivate this vehicle?</span>
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
            onClick={deleteItem}
            className="btn btn-primary btn-elevate"
          >
            {isLoading ? <span>Deactivate...</span> : <span>Deactivate</span>}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
