import React from "react"
import {
  Card,
  CardBody,
  CardHeader
} from "../../../../../../_metronic/_partials/controls"
import { FormEditDialog } from "../form-edit-dialog/FormEditDialog"
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName"

export function FormCard() {
  return (
    <Card>
      <CardHeader title={CurrentModuleName()}>
      </CardHeader>
      <CardBody>
        <FormEditDialog />
      </CardBody>
    </Card>
  )
}
