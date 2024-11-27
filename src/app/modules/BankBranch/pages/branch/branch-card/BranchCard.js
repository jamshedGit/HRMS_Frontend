import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { BranchTable } from "../branch-table/BranchTable"
import { useBranchUIContext } from "../BranchUIContext"
import { BranchFilter } from "../branch-filter/BranchFIlter"
import { useSelector, shallowEqual } from "react-redux"
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName"

export function BranchCard() {
  const BranchUIContext = useBranchUIContext()
  //console.log("banksUIContext", banksUIContext)
  const BranchUIProps = useMemo(() => {
    return {
      newBranchButtonClick: BranchUIContext.newBranchButtonClick,
      openEditBranchDialog: BranchUIContext.openEditBranchDialog,
    }
  }, [BranchUIContext])

  console.log(" Branch User Acccessss", userAccess);
  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Branch,
    }),
    shallowEqual
  )

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateBranch"
  )

  return (
    <>
      <Card>

        <CardHeader title={CurrentModuleName()} >

          <div className="d-flex justify-content-between align-items-center gap-3 m-4">



            <div className="pt-5">

              <BranchFilter />

            </div>

            <div className=" p-2">

              <CardHeaderToolbar>



                {accessUser && (

                  <button

                    type="button"

                    className="btn btn-primary"

                    onClick={BranchUIProps.newBranchButtonClick}

                  >

                    + Add Branch

                  </button>

                )}





              </CardHeaderToolbar>

            </div>



          </div>

        </CardHeader>



        <CardBody>



          <BranchTable />

        </CardBody>

      </Card>

    </>
  )
}
