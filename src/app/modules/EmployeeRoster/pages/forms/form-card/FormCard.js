import React from "react"
import {
  Card,
  CardBody,
} from "../../../../../../_metronic/_partials/controls"
import { FormEditDialog } from "../form-edit-dialog/FormEditDialog"
import { FormTable } from "../form-table/FormTable"
import '../../../../../utils/common-modules/form.css'

export function FormCard() {
  return (
    < Card >
      {/* Card Starts */}

      <CardBody>
        {/* FormEditDialog Starts */}
        <FormEditDialog />
        {/* FormEditDialog Ends */}

        <br />
        <hr />

        {/* FormTable Starts */}
        <FormTable />
        {/* FormTable Ends */}

      </CardBody>

      {/* Card Ends */}
    </Card >
  )
}
