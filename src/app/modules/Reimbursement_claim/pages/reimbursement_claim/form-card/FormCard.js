import React, { useMemo ,useEffect} from "react"
import { EmployeeSelect } from "../form-edit-dialog/EmployeeSelect"
import EmployeeProfile from "../../../../../utils/common-modules/EmployeeProfile"
import { FormEditDialog } from "../form-edit-dialog/FormEditDialog"
import { fetchAllActiveEmployees } from "../../../../../../_metronic/redux/dashboardActions"
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { FormTable } from "../form-table/FormTable"
import { useFormUIContext } from "../FormUIContext"
import { FormFIlter } from "../form-filter/FormFIlter"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

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
    console.log('FormUIProps',FormUIProps.id)

  },[FormUIProps])



  const { userAccess } = useSelector(
   
    (state) => ({
      
      userAccess: state.auth.userAccess.reimbursement_claim,
    }),
    shallowEqual
  )
 
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateReimbursementClaim"
  )

  const { currentState } = useSelector(
    (state) => {  return {
      
      currentState: state.reimbursement_claim,
      userAccess: state?.auth?.userAccess["reimbursement_claim"],
    }},
    shallowEqual
  );

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
  console.log("employeeId employeeId FormUIProps.id",FormUIProps.id)
  return (
    <>

      <Card>
      

        <CardBody>
        <EmployeeSelect setemployeeId={FormUIProps.setemployeeId} />
        <br />
        <hr />
        
        {/* {FormUIProps.employeeId && (
  <EmployeeProfile employeeId={FormUIProps.employeeId} />
)} */}

<EmployeeProfile employeeId={FormUIProps.employeeId} />
        {/* EmployeeProfile Ends */}

        <br />
        <hr />
   {/* FormEditDialog Starts */}
   <FormEditDialog id={FormUIProps.id} employeeId={FormUIProps.employeeId} />
        {/* FormEditDialog Ends */}

        <br />
        <hr />
          <FormTable />
          
        </CardBody>
      </Card>
    </>
  )
}
