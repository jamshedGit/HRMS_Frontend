import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { FormTable } from "../form-table/FormTable"
import { useFormUIContext } from "../FormUIContext"
import { FormFilter } from "../form-filter/FormFilter"
import { useSelector, shallowEqual } from "react-redux"

export function FormCard({id,setid}) {
  const FormUIContext = useFormUIContext()
  const formUIProps = useMemo(() => {
    return {
      newFormButtonClick: FormUIContext.newFormButtonClick,
      openEditFormDialog: FormUIContext.openEditFormDialog,
    }
  }, [FormUIContext])
  
  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess?.Payroll_Process_Policy,
    }),
    shallowEqual
  )
  
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreatePayrollProcessPolicy"
  )

  return (
    <>

      <Card>
        <CardHeader title="">
          <FormFilter />
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={formUIProps.newFormButtonClick}
              >
                + Add Payroll Policy
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
                    onClick={FormsUIProps.newUserButtonClick}
                  >
                    Add New User
                  </button>
                )
              }
            })} */}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>

          <FormTable formid = {id} setid = {setid} />
        </CardBody>
      </Card>
    </>
  )
}
