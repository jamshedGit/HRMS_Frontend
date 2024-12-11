import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { FormTable } from "../formdetails-table/FormDetailsTable"
import { useFormUIContext } from "../FormDetailsUIContext"
import { BanksFilter } from "../bank-filter/BanksFIlter"
import { useSelector, shallowEqual } from "react-redux"
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName"

export function FormCard() {
  const formUIContext = useFormUIContext()
  
  const FormUIProps = useMemo(() => {
    return {
      newFormButtonClick: formUIContext.newFormButtonClick,
      openEditFormDialog: formUIContext.openEditFormDialog,
    }
  }, [formUIContext])

  const { userAccess, currentState } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.FormDetails,
      currentState: state.formDetails,
    }),
    shallowEqual
  )

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateChildForms"
  )

  const currentId = currentState.currentId

  return (
    <>

      <Card>

        <CardHeader title={CurrentModuleName()} >

          <div className="d-flex justify-content-between align-items-center gap-3 m-4">



            <div className="pt-5">

              <BanksFilter />

            </div>

            <div className=" p-2">

              <CardHeaderToolbar>



                {accessUser && (

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={FormUIProps.newFormButtonClick}
                  >
                    + Add General Setup
                  </button>

                )}





              </CardHeaderToolbar>

            </div>



          </div>

        </CardHeader>



        <CardBody>



          <FormTable />

        </CardBody>

      </Card>
    </>
  )
}
