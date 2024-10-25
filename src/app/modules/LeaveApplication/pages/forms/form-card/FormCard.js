import React, { useEffect, useMemo } from "react"
import {
  Card,
  CardBody,
  CardHeader,
} from "../../../../../../_metronic/_partials/controls"
import { LeaveApplicationTable } from "../form-table/LeaveApplicationTable"
import { useFormUIContext } from "../FormUIContext"
import { FormFilter } from "../form-filter/FormFilter"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import EmployeeProfile from "../../../../../utils/common-modules/EmployeeProfile"
import { EmployeeSelect } from "../form-edit-dialog/EmployeeSelect"
import { fetchAllActiveEmployees, fetchAllLeaveType } from "../../../../../../_metronic/redux/dashboardActions"
import * as actions from "../../../_redux/formActions";
import { FormEditDialog } from "../form-edit-dialog/FormEditDialog"
import { LeaveBalanceTable } from "../form-table/LeaveBalanceTable"
import { PendingLeaveTable } from "../form-table/PendingLeaveTable"

const personBio = {
  Name: 'John Doe',
  Age: '30',
  Gender: 'Male',
  Address: '1234 Elm Street',
  Occupation: 'Software Engineer',
  Company: 'TechCorp',
  Email: 'john.doe@example.com',
  Phone: '+123456789',
};

export function FormCard() {
  const FormUIContext = useFormUIContext()
  const dispatch = useDispatch();

  //Get EmployeeId functions and values from Context in FormUIContext.js file
  const formUIProps = useMemo(() => {
    return {
      employeeId: FormUIContext.employeeId,
      setemployeeId: FormUIContext.setemployeeId,
      queryParamsLeaveApp: FormUIContext.queryParamsLeaveApp,
      id: FormUIContext.id,
    }
  }, [FormUIContext])

  //Get data from states
  const { userAccess, dashboard } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Leave_Application,
      dashboard: state.dashboard
    }),
    shallowEqual
  )

  //Check if access to create Leave Application
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateLeaveApplication"
  )

  //Get data from server and set on state whenever employee Id is updated
  useEffect(() => {
    if (formUIProps.employeeId)
      dispatch(actions.fetchLeaveApplication(formUIProps.queryParamsLeaveApp, formUIProps.employeeId))

    if (!dashboard.allEmployees || !dashboard.allEmployees.length)
      dispatch(fetchAllActiveEmployees());
    if (!dashboard?.allLeaveTypes || !dashboard?.allLeaveTypes?.length)
      dispatch(fetchAllLeaveType("allLeaveTypes"));
  }, [dispatch, formUIProps.employeeId, formUIProps.queryParamsLeaveApp])


  return (
    < Card >
      {/* Card Starts */}

      <CardBody>

        {/* EmployeeSelect Starts */}
        <EmployeeSelect setemployeeId={formUIProps.setemployeeId} />
        {/* EmployeeSelect Ends */}

        <br />
        <br />

        {/* EmployeeProfile Starts */}
        <EmployeeProfile employeeId={formUIProps.employeeId} data={personBio} />
        {/* EmployeeProfile Ends */}

        <br />
        <br />

        {/* FormEditDialog Starts */}
        <FormEditDialog id={formUIProps.id} employeeId={formUIProps.employeeId} />
        {/* FormEditDialog Ends */}

        <br />
        <br />

        {/* LeaveApplicationTable Starts */}
        <LeaveApplicationTable />
        {/* LeaveApplicationTable Ends */}

        <br />
        <br />

        {/* PendingLeaveTable Starts */}
        <PendingLeaveTable />
        {/* PendingLeaveTable Ends */}


        <br />
        <br />

        {/* LeaveBalanceTable Starts */}
        <LeaveBalanceTable />
        {/* LeaveBalanceTable Ends */}

      </CardBody>

      {/* Card Ends */}
    </Card >
  )
}
