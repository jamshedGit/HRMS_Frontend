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
import EmployeeProfile from "../../../../../utils/common-modules/EmployeeProfile"

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
  const formUIProps = useMemo(() => {
    return {
      newFormButtonClick: FormUIContext.newFormButtonClick,
      openEditFormDialog: FormUIContext.openEditFormDialog,
    }
  }, [FormUIContext])

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Leave_Application,
    }),
    shallowEqual
  )

  //Check if access to create Leave Application
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateLeaveApplication"
  )

  return (
    <>

      <Card>
        <CardHeader title={null}>
        </CardHeader>
        <CardBody>
          <EmployeeProfile data={personBio} />

          <FormTable />
        </CardBody>
      </Card>
    </>
  )
}
