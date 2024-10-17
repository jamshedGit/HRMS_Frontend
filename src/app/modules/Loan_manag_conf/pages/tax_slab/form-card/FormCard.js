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
  //console.log("FormUIContext", FormUIContext)
  const FormUIProps  = useMemo(() => {
    return {
      newFormButtonClick: FormUIContext.newFormButtonClick,
      openEditFormDialog: FormUIContext.openEditFormDialog,
    }
  }, [FormUIContext])

  const { userAccess } = useSelector(
   
    (state) => ({
      
      userAccess: state.auth.userAccess.loan_management_configuration,
    }),
    shallowEqual
  )
  console.log("userAccess Temp",userAccess)
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateLoanManagementConfiguration"
  )

  const { currentState } = useSelector(
    (state) => {  console.log("state ",state); return {
      
      currentState: state.loan_management_configuration,
      userAccess: state?.auth?.userAccess["loan_management_configuration"],
    }},
    shallowEqual
  );

  // const { currentState } = useSelector();
  
  const {entities } = currentState;
  console.log("currentState loan_management_configuration entities button",  entities?.length);

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
                + Add Loan Configuration
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
