import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function ItemEditDialogHeader({ id, itemForRead }) {
  //const userForEdit = false
  const [title, setTitle] = useState("");

  const { itemForEdit, actionsLoading } = useSelector(
    (state) => ({
      itemForEdit: state.vehicles.itemForEdit,
      actionsLoading: state.vehicles.actionsLoading,
    }),
    shallowEqual
  );

  //console.log("itemForEdit", itemForEdit)

  useEffect(() => {
    let _title = id ? "" : "New Vehicle";
    if (itemForEdit && id) {
      _title = `Edit Vehicle`;
    } //else if (isUserForRead) {
    //   _title = `Read user '}'`
    // }
    setTitle(_title);
  }, [itemForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {!itemForRead ? title : "Read Vehicle"}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
