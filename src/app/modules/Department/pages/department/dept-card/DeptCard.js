import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { DeptTable } from "../dept-table/DeptTable"
import { useDeptUIContext } from "../DeptUIContext"
import { DeptFilter } from "../dept-filter/DeptFIlter"
import { useSelector, shallowEqual } from "react-redux"

export function DeptCard() {
  const DeptUIContext = useDeptUIContext()
  //console.log("banksUIContext", banksUIContext)
  const DeptUIProps = useMemo(() => {
    return {
      newDeptButtonClick: DeptUIContext.newDeptButtonClick,
      openEditDeptDialog: DeptUIContext.openEditDeptDialog,
    }
  }, [DeptUIContext])

  const { userAccess } = useSelector(
    (state) =>
    ({
      userAccess: state.auth.userAccess.Department || [],
    }),
    shallowEqual
  )
  console.log("Department User Acccessss", userAccess);

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateDept"
  )

  return (
    <>

      <Card>
        <CardHeader title="">
          <DeptFilter />
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={DeptUIProps.newDeptButtonClick}
              >
                + Add Department
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
                    onClick={DeptUIProps.newUserButtonClick}
                  >
                    Add New User
                  </button>
                )
              }
            })} */}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>

          <DeptTable />
        </CardBody>
      </Card>
    </>
  )
}
