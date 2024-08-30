import React, { useEffect, useMemo } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { BankReadForm } from "./FormReadForm"
import { UserReadDialogHeader } from "./FormReadDialogHeader"
import { useFormUIContext } from "../FormUIContext"
import * as actions from "../../../_redux/formActions"

export function FormEditDialog({ id, show, onHide }) {
  const title = "FormEditDialog"
  const formUIContext = useFormUIContext()
  const usersUIProps = useMemo(() => {
    return {
      initUser: formUIContext.initUser,
      queryParams: formUIContext.queryParams,
    }
  }, [formUIContext])

  const dispatch = useDispatch()
  const { actionsLoading, userForEdit, roles, centers } = useSelector(
    (state) => ({
      
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.form.userForEdit,
      roles: state.users.roles,
      centers: state.users.centers,
    }),
    shallowEqual
  )
  console.log("user RealDialogs" + userForEdit)
  //console.log(title, roles)

  useEffect(() => {
    console.log("user read dialog.js")
    dispatch(actions.fetchUser(id))
    dispatch(actions.fetchRoles())
    dispatch(actions.fetchCenters())
    // dispatch(actions.fetchUser(usersUIProps.queryParams))
  }, [id, dispatch])
  console.log("userForEdit", userForEdit)
  const saveBank = (user) => {
     console.log("CreateUserResponse", user)
    if (!id) {
      dispatch(actions.createUser(user)).then((res) => {
        onHide()
        //dispatch(actions.fetchUser(queryParams))
      })
    } else {
      const userUpdatedFields = {
        Id: user.Id,
        Name: user.Name,
       
      }
      dispatch(actions.updateUser(userUpdatedFields)).then(() => onHide())
    }
  }

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <UserReadDialogHeader id={id} />
      <BankReadForm
        saveBank={saveBank}
        user={userForEdit || usersUIProps.initUser}
        onHide={onHide}
        roles={roles}
        centers={centers}
      />
    </Modal>
  )
}
