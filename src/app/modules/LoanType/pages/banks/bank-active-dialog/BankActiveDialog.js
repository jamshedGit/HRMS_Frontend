import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/bankActions";
import { useBanksUIContext } from "../BanksUIContext";

export function BankActiveDialog({ id, status, show, onHide }) {
  const [loading, setLoading] = useState(false);
  // Customers UI Context
  const usersUIContext = useBanksUIContext();
  const banksUIProps = useMemo(() => {
    return {
      queryParams: usersUIContext.queryParams,
    };
  }, [usersUIContext]);

  // Customers Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.loan_type.actionsLoading }),
    shallowEqual
  );

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
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

  const deleteAcademic = () => {
    // server request for deleting customer by id
    enableLoading();
    dispatch(actions.activeUser(id)).then(() => {
      onHide();
      // refresh list after deletion
      dispatch(actions.fetchUsers(banksUIProps.queryParams));
      // clear selections list
      // banksUIProps.setIds([]);
      // closing delete modal
      disableLoading();
    });
  };
  //console.log("status", status, id);
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
          Activate User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Are you sure to activate this user?</span>}
        {isLoading && <span>user is activating...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate">
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteAcademic}
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
