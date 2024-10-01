import React, { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"

export function BankReadDialogHeader({ id }) {
  const userForEdit = false
  const [title, setTitle] = useState("")

  useEffect(() => {
    let _title = id ? "" : "New User"
    if (userForEdit && id) {
      _title = `Edit user '${userForEdit.firstName} ${userForEdit.lastName}'`
    }
    setTitle(_title)
  })

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  )
}
