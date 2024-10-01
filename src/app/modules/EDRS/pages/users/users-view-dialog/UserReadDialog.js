import React, { useEffect, useMemo } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { UserReadForm } from "./UserReadForm"
import { UserReadDialogHeader } from "./UserReadDialogHeader"
import { useUsersUIContext } from "../UsersUIContext"
import * as actions from "../../../_redux/usersActions"

export function UsersEditDialog({ id, show, onHide }) {
  const title = "UserEditDialog"
  const usersUIContext = useUsersUIContext()
  const usersUIProps = useMemo(() => {
    return {
      initUser: usersUIContext.initUser,
      queryParams: usersUIContext.queryParams,
    }
  }, [usersUIContext])

  const dispatch = useDispatch()
  const { actionsLoading, userForEdit, roles, centers } = useSelector(
    (state) => ({
      
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.receipt.userForEdit,
      roles: state.users.roles,
      centers: state.users.centers,
    }),
    shallowEqual
  )
  
  //console.log(title, roles)

  useEffect(() => {
    console.log("user read dialog.js")
    dispatch(actions.fetchUser(id))
    dispatch(actions.fetchRoles())
    dispatch(actions.fetchCenters())
    // dispatch(actions.fetchUser(usersUIProps.queryParams))
  }, [id, dispatch])
  console.log("userForEdit", userForEdit)
  const saveUser = (user) => {
     console.log("CreateUserResponse", user)
    if (!id) {
      dispatch(actions.createUser(user)).then((res) => {
        onHide()
        //dispatch(actions.fetchUser(queryParams))
      })
    } else {
      const userUpdatedFields = {
        receiptId: user.receiptId,
        receiptNo: user.receiptNo,
        donorName: user.donorName,
        phoneno: user.phoneno,
        amount: user.amount,
        bankName: user.bankName,
        bookNo: user.bookNo,
        description: user.description,
        roleId: user.roleId,
        centerId: user.centerId,
        cityId: user.cityId, 
        clerkName: user.clerkName,
        type:user.type 
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
      <UserReadForm
        saveUser={saveUser}
        user={userForEdit || usersUIProps.initUser}
        onHide={onHide}
        roles={roles}
        centers={centers}
      />
    </Modal>
  )
}
