import React from "react"
import {
  Card,
} from "../../../../../../_metronic/_partials/controls"
import { FormEditDialog } from "../form-edit-dialog/FormEditDialog"
import '../../../../../utils/common-modules/form.css'

export function FormCard() {
  return (
    < Card>
      {/* Card Starts */}
        {/* FormEditDialog Starts */}
        <FormEditDialog />
        {/* FormEditDialog Ends */}
      {/* Card Ends */}
    </Card >
  )
}
