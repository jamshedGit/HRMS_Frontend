import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { DesignationTable } from "../designation-table/DesignationTable"
import { useDesignationUIContext } from "../DesignationUIContext"
import { BanksFilter } from "../bank-filter/BanksFIlter"
import { useSelector, shallowEqual } from "react-redux"
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName"

export function ReligionCard() {
  const designationUIContext = useDesignationUIContext()
  //console.log("designationUIContext", designationUIContext)
  const DesignationUIProps = useMemo(() => {
    return {
      newDesignationButtonClick: designationUIContext.newDesignationButtonClick,
      openEditDesignationDialog: designationUIContext.openEditDesignationDialog,
    }
  }, [designationUIContext])

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Policy,
    }),
    shallowEqual
  )
  console.log("userAccess Temp",userAccess)
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreatePolicy"
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
onClick={DesignationUIProps.newDesignationButtonClick}
>
+ Add Employee Policy
</button>

        )}





      </CardHeaderToolbar>

    </div>



  </div>

</CardHeader>



<CardBody>



  <DesignationTable />

</CardBody>

</Card>
    </>
  )
}
