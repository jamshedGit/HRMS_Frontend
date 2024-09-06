import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/centers/centersActions";
import { useCentersUIContext } from "../CentersUIContext";

export function CenterDeleteDialog({ id, show, onHide }) {
  // Centers UI Context
  const [loading, setLoading] = useState(false);
  const centersUIContext = useCentersUIContext();
  const centersUIProps = useMemo(() => {
    return {
      queryParams: centersUIContext.queryParams,
    };
  }, [centersUIContext]);

  // Customers Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.customers.actionsLoading }),
    shallowEqual
  );
  const enableLoading = () => {
    setLoading(true);
  };

  const disabledLoading = () => {
    setLoading(false);
  };
  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteUser = () => {
    // server request for deleting customer by id
    enableLoading();
    dispatch(actions.deleteCenter(id)).then(() => {
      onHide();
      // refresh list after deletion
      dispatch(actions.fetchCenters(centersUIProps.queryParams));
      // clear selections list
      // usersUIProps.setIds([]);
      // closing delete modal

      disabledLoading();
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
          Delete Record Center
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Are you sure to Delete Record this center?</span>}
        {isLoading && <span> center is deactivating...</span>}
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
            onClick={deleteUser}
            className="btn btn-primary btn-elevate"
          >
            Delete Record
            {loading && (
              <span className="ml-3 mr-3 spinner spinner-white"></span>
            )}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
