import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { FormTable } from "../form-table/FormTable"
import { useFormUIContext } from "../FormUIContext"
import { BanksFilter } from "../bank-filter/BanksFIlter"
import { useSelector, shallowEqual } from "react-redux"
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName"

export function FormCard() {
  const formUIContext = useFormUIContext()
  //console.log("formUIContext", formUIContext)
  const FormUIProps = useMemo(() => {
    return {
      newFormButtonClick: formUIContext.newFormButtonClick,
      openEditFormDialog: formUIContext.openEditFormDialog,
    }
  }, [formUIContext])

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Form,
    }),
    shallowEqual
  )
  console.log("userAccess Temp", userAccess)
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateForm"
  )

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
