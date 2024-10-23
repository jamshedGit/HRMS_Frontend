import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function MortuaryEditDialogHeader({ id, isForEdit }) {
  const [title, setTitle] = useState("");
  const { actionsLoading } = useSelector((state) => state.personalInformation);

  useEffect(() => {
    let _title = id ? "" : "New Center";
    if (isForEdit) {
      _title = `Edit Mortuary Detail`;
    } else {
      _title = `Add Mortuary Information`;
    }
    setTitle(_title);
  }, [id, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
