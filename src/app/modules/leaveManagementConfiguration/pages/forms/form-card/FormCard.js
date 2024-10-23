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
      userAccess: state.auth.userAccess.Leave_Management_Configuration,
    }),
    shallowEqual
  )

  //Check if access to create Leave Type
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateLeaveManagementConfiguration"
  )

  return (
    <>

      <Card>
        <CardHeader title={null}>
          <FormFilter />
          <CardHeaderToolbar>
            {accessUser && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={formUIProps.newFormButtonClick}
              >
                + Add Leave Type
              </button>
            )}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>

          <FormTable />
        </CardBody>
      </Card>
    </>
  )
}
