import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function FormEditDialogHeader({ id, isUserForRead }) {
  //const userForEdit = false
  const [title, setTitle] = useState("");
 
  const { userForEdit, actionsLoading } = useSelector(
    
    (state) => ({
      userForEdit: state.formDetails.userForEdit,
      actionsLoading: state.users.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : "New Form";
    if (id) {
      _title = `Edit Form`;
    } //else if (isUserForRead) {
    //   _title = `Read user '}'`
    // }
    setTitle(_title);
  }, [userForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {!isUserForRead ? title : "View Form"}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
