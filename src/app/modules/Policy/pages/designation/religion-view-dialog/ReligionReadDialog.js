import React, { useEffect, useMemo } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { BankReadForm } from "./ReligionReadForm"
import { UserReadDialogHeader } from "./ReligionReadDialogHeader"
import { useBanksUIContext } from "../DesignationUIContext"
import * as actions from "../../../_redux/designationActions"

export function BankEditDialog({ id, show, onHide }) {
  const title = "BankEditDialog"
  const banksUIContext = useBanksUIContext()
  const usersUIProps = useMemo(() => {
    return {
      initUser: banksUIContext.initUser,
      queryParams: banksUIContext.queryParams,
    }
  }, [banksUIContext])

  const dispatch = useDispatch()
  const { actionsLoading, userForEdit, roles, centers } = useSelector(
    (state) => ({
      
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.policy.userForEdit,
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
        designationName: user.designationName,
        designationCode: user.designationCode,
       
      }
      dispatch(actions.updateDesignation(userUpdatedFields)).then(() => onHide())
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
