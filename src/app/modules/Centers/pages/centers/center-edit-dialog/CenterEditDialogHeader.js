import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CenterEditDialogHeader({ id, isUserForRead }) {
  //const userForEdit = false
  const [title, setTitle] = useState("");

  const { actionsLoading } = useSelector(
    (state) => ({
      actionsLoading: state.centers.actionsLoading,
    }),
    shallowEqual
  );

  //console.log("actionsLoading", actionsLoading)

  useEffect(() => {
    let _title = id ? "" : "New Center";
    if (id) {
      _title = `Center Details`;
    } else {
      _title = `Add New Center`;
    }
    setTitle(_title);
  }, [id, actionsLoading]);

  return (
    <>
      {/* {actionsLoading && <ModalProgressBar />} */}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
