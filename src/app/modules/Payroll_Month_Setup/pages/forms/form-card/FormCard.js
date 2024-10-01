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

export function FormCard() {
  const FormUIContext = useFormUIContext()
  const formUIProps = useMemo(() => {
    return {
      newFormButtonClick: FormUIContext.newFormButtonClick,
      openEditFormDialog: FormUIContext.openEditFormDialog,
    }
  }, [FormUIContext])
  
  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Payroll_Month,
    }),
    shallowEqual
  )
  
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreatePayrollMonth"
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
                + Add Payroll Month
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

          <FormTable />
        </CardBody>
      </Card>
    </>
  )
}
