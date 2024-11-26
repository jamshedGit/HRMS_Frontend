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
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName"

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
      
      userAccess: state.auth.userAccess.gratuity_configuration,
    }),
    shallowEqual
  )

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateGratuityConfiguration"
  )

  const { currentState } = useSelector(
    (state) => {  return {
      
      currentState: state.gratuity_configuration,
      userAccess: state?.auth?.userAccess["gratuity_configuration"],
    }},
    shallowEqual
  );

  // const { currentState } = useSelector();

  const {entities } = currentState;
  // const auth = useSelector(({ auth }) => auth, shallowEqual);
  // const UserAccess = auth?.userAccess;
  // const pathName = window?.location?.pathname?.substring(1);
  
  // const name = useMemo(() => {
  //   return Object.values(UserAccess || {})?.flatMap(el => el)?.find(acc => acc?.url == pathName)?.name || '';
  // }, [pathName, UserAccess])

  return (
    <>

      <Card>
        <CardHeader title={CurrentModuleName()} >
          <div className="d-flex justify-content-between align-items-center gap-3 m-4">

      <div className="pt-5">
      <FormFIlter />
      </div>
      <div className=" p-2">
      <CardHeaderToolbar>
    
    <button
      type="button"
      className="btn btn-primary "
      onClick={FormUIProps .newFormButtonClick}
    >
      + Add Gratuity Configuration
    </button>
  

</CardHeaderToolbar>
      </div>
       
          </div>
        </CardHeader>

        <CardBody>

          <FormTable />
        </CardBody>
      </Card>
    </>
  )
}
