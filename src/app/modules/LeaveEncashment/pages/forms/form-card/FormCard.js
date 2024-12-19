import React, { useEffect, useMemo } from "react"
import {
  Card,
  CardBody,
  CardHeader
} from "../../../../../../_metronic/_partials/controls"
import { LeaveEncashmentTable } from "../form-table/LeaveEncashmentTable"
import { useFormUIContext } from "../FormUIContext"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import EmployeeProfile from "../../../../../utils/common-modules/EmployeeProfile"
import { EmployeeSelect } from "../form-edit-dialog/EmployeeSelect"
import { fetchAllActiveEmployees, fetchAllFiscalYearData, fetchAllLeaveType, fetchEncashmentLeaveType } from "../../../../../../_metronic/redux/dashboardActions"
import * as actions from "../../../_redux/formActions";
import { FormEditDialog } from "../form-edit-dialog/FormEditDialog"
import { LeaveBalanceTable } from "../form-table/LeaveBalanceTable"
import { PendingLeaveTable } from "../form-table/PendingLeaveEncTable"
import '../../../../../utils/common-modules/form.css'
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName"

export function FormCard() {
  const FormUIContext = useFormUIContext()
  const dispatch = useDispatch();

  //Get EmployeeId functions and values from Context in FormUIContext.js file
  const formUIProps = useMemo(() => {
    return {
      employeeId: FormUIContext.employeeId,
      setemployeeId: FormUIContext.setemployeeId,
      yearId: FormUIContext.yearId,
      setyearId: FormUIContext.setyearId,
      queryParamsLeaveEnc: FormUIContext.queryParamsLeaveEnc,
      id: FormUIContext.id,
      setId: FormUIContext.setId
    }
  }, [FormUIContext])

  //Get data from states
  const { dashboard, entities } = useSelector(
    (state) => ({
      dashboard: state.dashboard,
      entities: state.leave_encashment.entities
    }),
    shallowEqual
  )

  //Get data from server and set on state whenever employee Id is updated
  useEffect(() => {
    dispatch(actions.fetchLeaveEncashment(formUIProps.queryParamsLeaveEnc, formUIProps.employeeId, formUIProps.yearId))

    if (!dashboard.allEmployees || !dashboard.allEmployees.length)
      dispatch(fetchAllActiveEmployees());
    if (!dashboard?.allFiscalYears?.length)
      dispatch(fetchAllFiscalYearData("allFiscalYears"));
  }, [dispatch, formUIProps.employeeId, formUIProps.yearId, formUIProps.queryParamsLeaveEnc])


  //Update Leave Balances whenever employee Id is changed or leave encashment table is updated
  //Also update dropdown of leave type when employee is selected
  useEffect(() => {
    dispatch(actions.fetchLeaveBalances(formUIProps.employeeId))
    dispatch(fetchEncashmentLeaveType("allLeaveTypes", formUIProps.employeeId, formUIProps.yearId));
    dispatch(actions.getPayrollMonth(formUIProps.employeeId));

  }, [dispatch, formUIProps.employeeId, formUIProps.yearId, entities])



  return (
    < Card >
      {/* Card Starts */}

      <CardBody>

        <CardHeader title={CurrentModuleName()} >
        </CardHeader>

        <div className="justify-content-between align-items-center gap-3 m-4">
          <div className="pt-5">

            {/* EmployeeSelect Starts */}
            <EmployeeSelect setId={formUIProps.setId} setemployeeId={formUIProps.setemployeeId} setyearId={formUIProps.setyearId} />
            {/* EmployeeSelect Ends */}

            <br />
            <hr />

          </div>

          {/* EmployeeProfile Starts */}
          <EmployeeProfile employeeId={formUIProps.employeeId} />
          {/* EmployeeProfile Ends */}

          <br />
          <hr />

          {/* FormEditDialog Starts */}
          <FormEditDialog id={formUIProps.id} employeeId={formUIProps.employeeId} yearId={formUIProps.yearId} />
          {/* FormEditDialog Ends */}

        </div>
        <br />

        {/* LeaveEncashmentTable Starts */}
        <LeaveEncashmentTable />
        {/* LeaveEncashmentTable Ends */}

        <br />
        <hr />

        {/* This is Commented for now because we don't have scenario of pending yet  (start)*/}
        {/* PendingLeaveTable Starts */}
        {/* <PendingLeaveTable /> */}
        {/* PendingLeaveTable Ends */}

        {/* <br />
        <hr /> */}
        {/* This is Commented for now because we don't have scenario of pending yet (End)*/}

        {/* LeaveBalanceTable Starts */}
        <LeaveBalanceTable />
        {/* LeaveBalanceTable Ends */}

      </CardBody>

      {/* Card Ends */}
    </Card >
  )
}
