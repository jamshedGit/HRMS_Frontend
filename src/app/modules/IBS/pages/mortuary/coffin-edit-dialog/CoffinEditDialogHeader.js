import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CoffinEditDialogHeader() {
  const mortuaryState = useSelector((state) => state.mortuary);
  const { actionsLoading } = mortuaryState;

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Add Coffin Information
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
