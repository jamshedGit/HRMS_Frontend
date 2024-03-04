import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function InfoEditDialogHeader({ id, isUserForRead }) {
  const [title, setTitle] = useState("");
  const { actionsLoading } = useSelector((state) => state.personalInformation);

  useEffect(() => {
    let _title = "";
    if (isUserForRead) {
      _title = `IBS Read Form`;
    } else if (id) {
      _title = `IBS Edit Form`;
    } else {
      _title = `Add New Info`;
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
