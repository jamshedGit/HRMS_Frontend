import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { FormTable } from "../formdetails-table/FormDetailsTable"
import { useFormUIContext } from "../FormDetailsUIContext"
import { BanksFilter } from "../bank-filter/BanksFIlter"
import { useSelector, shallowEqual } from "react-redux"

export function FormCard() {
  const formUIContext = useFormUIContext()
  //console.log("formUIContext", formUIContext)
  const FormUIProps = useMemo(() => {
    return {
      newFormButtonClick: formUIContext.newFormButtonClick,
      openEditFormDialog: formUIContext.openEditFormDialog,
    }
  }, [formUIContext])

  const { userAccess, currentState } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.FormDetails,
      currentState: state.formDetails,
    }),
    shallowEqual
  )
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateChildForms"
  )

  const currentId = currentState.currentId

  return (
    <>

      <Card>
        <CardHeader title="">
          <BanksFilter />
          <CardHeaderToolbar>
            {accessUser && currentId ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={FormUIProps.newFormButtonClick}
              >
                + Add Child Menu
              </button>
            ) : (
              <></>
            )}
            {/* {userAccess.find((item) => {
              if (
                item.componentName === "CreateUser" ||
                item.isAccess === true
              ) {
                return (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={FormUIProps.newUserButtonClick}
                  >
                    Add New User
                  </button>
                )
              }
            })} */}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>

          <FormTable />
        </CardBody>
      </Card>
    </>
  )
}
