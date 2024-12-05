import React, { useMemo, useEffect } from "react"
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
import { getAllReimbursementConfigPolicy } from "../../../_redux/redux-Actions"
import { ContactInfoEditForm } from "../contactInfo-edit-dialog/ContactInfoEditForm"
import { ContactInfoEditDialog } from "../contactInfo-edit-dialog/ContactInfoEditDialog"
import { WorkExperienceEditDialog } from "../workExperience-edit-dialog/WorkExperienceEditDialog"
import { AcademicInfoEditDialog } from "../academicInfo-edit-dialog/AcademicInfoEditDialog"
import { EmployeeSkillsEditDialog } from "../employeeSkills-edit-dialog/EmployeeSkillsEditDialog"
import { IncidentInfoEditDialog } from "../incidentInfo-edit-dialog/IncidentInfoEditDialog"

export function FormCard() {
  const FormUIContext = useFormUIContext()
  const dispatch = useDispatch();
  const FormUIProps = useMemo(() => {
    return {
      employeeId: FormUIContext.employeeId,
      setemployeeId: FormUIContext.setemployeeId,
      id: FormUIContext.ids,
    }
  }, [FormUIContext])

  useEffect(() => {


  }, [FormUIProps])



  const { userAccess } = useSelector(

    (state) => ({

      userAccess: state.auth.userAccess.employee_profile,
    }),
    shallowEqual
  )

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateEmployeProfile"
  )

  const { currentState } = useSelector(
    (state) => {
      return {

        currentState: state.employee_profile,
        userAccess: state?.auth?.userAccess["employee_profile"],
      }
    },
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


  useEffect(() => {


    if (FormUIProps.employeeId)
      dispatch(getAllReimbursementConfigPolicy({ Id: FormUIProps.employeeId }));

  }, [dispatch, FormUIProps.employeeId])


  return (
    <>

      <Card>


        <CardBody>
          <FormTable />
          <br />
          <br />
          {/* <hr /> */}
          {/* FormEditDialog Starts */}
          <FormEditDialog id={FormUIProps.id} employeeId={FormUIProps.employeeId} />
          {/* FormEditDialog Ends */}

          <br />
          <br />

          <ContactInfoEditDialog />

          <br />
          <br />

          <WorkExperienceEditDialog />

          
          <br />
          <br />

          <AcademicInfoEditDialog />


          <br />
          <br />

          <EmployeeSkillsEditDialog />
          <br />
          <br />

          <IncidentInfoEditDialog />
        </CardBody>
      </Card>
    </>
  )
}
