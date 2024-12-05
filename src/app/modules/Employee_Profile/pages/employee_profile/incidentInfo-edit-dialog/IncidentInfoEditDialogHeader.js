import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function IncidentInfoEditDialogHeader({ id, isUserForRead }) {
  //const userForEdit = false
  const [title, setTitle] = useState("");
 
  const { userForEdit, actionsLoading } = useSelector(
    
    (state) => ({
      userForEdit: state?.employee_profile?.userForEdit,
      actionsLoading: state?.users?.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : "Add Incident Information";
    if (id) {
      _title = `Edit Incident Information`;
    } //else if (isUserForRead) {
    //   _title = `Read user '}'`
    // }
    setTitle(_title);
  }, [userForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg " className="text-bold">
          {!isUserForRead ? title : "View"}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
