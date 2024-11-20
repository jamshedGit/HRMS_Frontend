import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { FormTable } from "../form-table/FormTable"
import { useFormUIContext } from "../FormUIContext"
import { FormFIlter } from "../form-filter/FormFIlter"
import { useSelector, shallowEqual } from "react-redux"

export function FormCard() {
  const FormUIContext = useFormUIContext()

  const FormUIProps  = useMemo(() => {
    return {
      newFormButtonClick: FormUIContext.newFormButtonClick,
      openEditFormDialog: FormUIContext.openEditFormDialog,
    }
  }, [FormUIContext])

  const { userAccess } = useSelector(
   
    (state) => ({
      
      userAccess: state.auth.userAccess.payroll_process,
    }),
    shallowEqual
  )

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreatePayrollProcess"
  )

  const { currentState } = useSelector(
    (state) => {  return {
      
      currentState: state.payroll_process,
      userAccess: state?.auth?.userAccess["payroll_process"],
    }},
    shallowEqual
  );

  // const { currentState } = useSelector();
  
  const {entities } = currentState;

  return (
    <>

      <Card>
        <CardHeader title="">
          {/* <FormFIlter /> */}
          <CardHeaderToolbar>
          {/* {accessUser &&  entities?.length==0 ? ( */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={FormUIProps .newFormButtonClick}
              >
                + Add Payroll Process
              </button>
            {/* ) : (
              <></>
            )} */}
   
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>

          <FormTable />
        </CardBody>
      </Card>
    </>
  )
}
