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
      
      userAccess: state.auth.userAccess.accrue_gratuity_configuration,
    }),
    shallowEqual
  )

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateAccrueGratuityConfiguration"
  )

  const { currentState } = useSelector(
    (state) => {  console.log("s"); return {
      
      currentState: state.accrue_gratuity_configuration,
      userAccess: state?.auth?.userAccess["accrue_gratuity_configuration"],
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
                + Add Accrue Gratuity Configuration
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
