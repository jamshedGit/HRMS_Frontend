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

export function BranchCard() {
  const BranchUIContext = useBranchUIContext()
  //console.log("banksUIContext", banksUIContext)
  const BranchUIProps = useMemo(() => {
    return {
      newBranchButtonClick: BranchUIContext.newBranchButtonClick,
      openEditBranchDialog: BranchUIContext.openEditBranchDialog,
    }
  }, [BranchUIContext])

  console.log(" Branch User Acccessss",userAccess);
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
        <CardHeader title="">
          <BranchFilter />
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={BranchUIProps.newBranchButtonClick}
              >
                + Add Branch
              </button>
            ) : (
              <></>
            )}
            {/* {userAccess.find((item) => {
              if (
                item.componentName === "CreateUser" ||
                item.isAccess === true
              ) {
                return (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={BranchUIProps.newUserButtonClick}
                  >
                    Add New User
                  </button>
                )
              }
            })} */}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>

          <BranchTable />
        </CardBody>
      </Card>
    </>
  )
}
