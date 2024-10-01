import React, { useEffect, useMemo } from "react"
import { Modal } from "react-bootstrap"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { ReadForm } from "./FormReadDialogForm"
import { UserReadDialogHeader } from "./FormReadDialogHeader"
import { useFormUIContext } from "../FormUIContext"
import * as actions from "../../../_redux/formActions"

export function FormEditDialog({ id, show, onHide }) {
  const title = "FormEditDialog"
  const FormUIContext = useFormUIContext()
  const usersUIProps = useMemo(() => {
    return {
      initUser: FormUIContext.initUser,
      queryParams: FormUIContext.queryParams,
    }
  }, [FormUIContext])

  const dispatch = useDispatch()
  const { actionsLoading, userForEdit, roles, centers } = useSelector(
    (state) => ({
      
      actionsLoading: state.users.actionsLoading,
      userForEdit: state.tax_setup.userForEdit,
      roles: state.users.roles,
      centers: state.users.centers,
    }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(actions.fetchUser(id))
    dispatch(actions.fetchRoles())
    dispatch(actions.fetchCenters())
    // dispatch(actions.fetchUser(usersUIProps.queryParams))
  }, [id, dispatch])
  const SaveTaxSetup = (user) => {
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
      <ReadForm
        SaveTaxSetup={SaveTaxSetup}
        user={userForEdit || usersUIProps.initUser}
        onHide={onHide}
        roles={roles}
        centers={centers}
      />
    </Modal>
  )
}
