import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/info-personal/infoActions";
//import { useInfoUIContext } from "../PersonalUIContext";

export function InfoDeleteDialog({ id, show, onHide }) {
  // Centers UI Context
  const [loading, setLoading] = useState(false);
  //const centersUIContext = useInfoUIContext();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const fnDeleteRecord = () => {
    // server request for deleting customer by id
    enableLoading();
    dispatch(actions.deleteRecord(+id)).then(() => {
      onHide();
      // refresh list after deletion
      // dispatch(actions.fetchCenters(centersUIProps.queryParams));
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
          Deactivate Record
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Are you sure to deactivate this record?</span>}
        {isLoading && <span> Record is deactivating...</span>}
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
            onClick={fnDeleteRecord}
            className="btn btn-primary btn-elevate"
          >
            Deactivate
            {loading && (
              <span className="ml-3 mr-3 spinner spinner-white"></span>
            )}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
