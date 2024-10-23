import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/mortuary/reduxActions";
//import { useCentersUIContext } from "../MortuaryUIContext";

export function MortuaryActiveDialog({ id, show, onHide }) {
  // Centers UI Context
  const [loading, setLoading] = useState(false);
  // const centersUIContext = useCentersUIContext();
  // const centersUIProps = useMemo(() => {
  //   return {
  //     queryParams: centersUIContext.queryParams,
  //   };
  // }, [centersUIContext]);

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
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteUser = () => {
    enableLoading();
    dispatch(actions.activeRecord(id)).then(() => {
      onHide();
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
          Activate Record
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span> Are you sure to active this record?</span>}
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
            Activate
            {loading && (
              <span className="ml-3 mr-3 spinner spinner-white"></span>
            )}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
