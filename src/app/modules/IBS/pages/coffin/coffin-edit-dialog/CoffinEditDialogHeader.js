import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CoffinEditDialogHeader({ id, isUserForRead }) {
  //const userForEdit = false
  const [title, setTitle] = useState("");

  const coffinState = useSelector((state) => state.coffin);

  const { actionsLoading } = coffinState;

  //console.log("actionsLoading", actionsLoading)

  useEffect(() => {
    let _title = id ? "" : "New Center";
    if (id) {
      _title = `Edit Coffin Detail`;
    } else {
      _title = `Add Coffin Information`;
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
