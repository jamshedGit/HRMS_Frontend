import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function MortuaryEditDialogHeader({ id, isUserForRead }) {
  const [title, setTitle] = useState("");
  const mortuaryState = useSelector((state) => state.mortuary);
  const { actionsLoading } = mortuaryState;

  //console.log("actionsLoading", actionsLoading)

  useEffect(() => {
    let _title = "Add Mortuary Information";
    if (isUserForRead) {
      _title = `Read Mortuary Detail`;
    } else if (id) {
      _title = `Edit Mortuary Detail`;
    }
    setTitle(_title);
  }, [id, actionsLoading, isUserForRead]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
