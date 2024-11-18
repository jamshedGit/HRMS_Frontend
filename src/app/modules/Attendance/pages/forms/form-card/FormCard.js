import React, { useMemo } from "react"
import {
  Card,
} from "../../../../../../_metronic/_partials/controls"
import { useFormUIContext } from "../FormUIContext"
import { useSelector, shallowEqual } from "react-redux"
import { FormEditDialog } from "../form-edit-dialog/FormEditDialog"
import '../../../../../utils/common-modules/form.css'

export function FormCard() {
  const FormUIContext = useFormUIContext()
  const formUIProps = useMemo(() => {
    return {
    }
  }, [FormUIContext])

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Attendance,
    }),
    shallowEqual
  )

  //Check if access to create Attendance
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateAttendance"
  )

  return (
    < Card className="papa">
      {/* Card Starts */}
        {/* FormEditDialog Starts */}
        <FormEditDialog />
        {/* FormEditDialog Ends */}
      {/* Card Ends */}
    </Card >
  )
}
