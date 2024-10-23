import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { ReceiptsTable } from "../users-table/ReceiptsTable"
import { useUsersUIContext } from "../UsersUIContext"
import { UsersFilter } from "../users-filter/UsersFIlter"
import { useSelector, shallowEqual } from "react-redux"

export function UsersCard() {
  const usersUIContext = useUsersUIContext()
  //console.log("usersUIContext", usersUIContext)
  const usersUIProps = useMemo(() => {
    return {
      newUserButtonClick: usersUIContext.newUserButtonClick,
      openEditUserDialog: usersUIContext.openEditUserDialog,
    }
  }, [usersUIContext])

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.EDRS,
    }),
    shallowEqual
  )

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateReceipt"
  )

  return (
    <>

      <Card>
        <CardHeader title="">
          <UsersFilter />
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={usersUIProps.newUserButtonClick}
              >
                + New Receipt
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
                    onClick={usersUIProps.newUserButtonClick}
                  >
                    Add New User
                  </button>
                )
              }
            })} */}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>

          <ReceiptsTable />
        </CardBody>
      </Card>
    </>
  )
}
