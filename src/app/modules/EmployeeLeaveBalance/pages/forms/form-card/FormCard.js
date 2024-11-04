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
import { FormEditDialog } from "../form-edit-dialog/FormEditDialog"

export function FormCard() {
  return (
    <Card>
      <CardBody>
        <FormEditDialog />
      </CardBody>
    </Card>
  )
}
