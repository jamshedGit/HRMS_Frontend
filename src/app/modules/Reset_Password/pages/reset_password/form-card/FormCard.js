import React, { useMemo ,useEffect} from "react"

import EmployeeProfile from "../../../../../utils/common-modules/EmployeeProfile"
import { FormEditDialog } from "../form-edit-dialog/FormEditDialog"
import { fetchAllActiveEmployees } from "../../../../../../_metronic/redux/dashboardActions"


import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"

import { useFormUIContext } from "../FormUIContext"

import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { getAllReimbursementConfigPolicy } from "../../../_redux/redux-Actions"

export function FormCard() {
  const FormUIContext = useFormUIContext()
  const dispatch = useDispatch();
  const FormUIProps  = useMemo(() => {
    return {
      employeeId: FormUIContext.employeeId,
      setemployeeId: FormUIContext.setemployeeId,
      queryParamsLeaveApp: FormUIContext.queryParamsLeaveApp,
      id: FormUIContext.ids,
    }
  }, [FormUIContext])

  useEffect(()=>{


  },[FormUIProps])

  const { currentState, userAccess } = useSelector(
    (state) => {
      console.log("statepassword", state); // Log the entire state
      return {


        currentState: state.password,
        userAccess: state?.auth?.userAccess["Password"],
      }
    },
    shallowEqual
  );


  const accessUser = userAccess.find(
    (item) => item.componentName === "ResetPassword"
  )

  console.log("accessUser111", accessUser);
  const { dashboard } = useSelector(
    (state) => ({
      dashboard: state.dashboard
    }),
    shallowEqual
  )


  useEffect(() => {


    if (!dashboard.allEmployees || !dashboard.allEmployees.length)
      dispatch(fetchAllActiveEmployees());

  }, [dispatch, FormUIProps.employeeId])

  
  useEffect(() => {


    if (FormUIProps.employeeId)
      dispatch(getAllReimbursementConfigPolicy({Id:FormUIProps.employeeId}));

  }, [dispatch, FormUIProps.employeeId])

  
  return (
    <>

      <Card>
      

        <CardBody>
       
        



   <FormEditDialog id={FormUIProps.id} employeeId={FormUIProps.employeeId} />
 
          
        </CardBody>
      </Card>
    </>
  )
}
