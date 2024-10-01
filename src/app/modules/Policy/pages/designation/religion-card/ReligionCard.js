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

export function ReligionCard() {
  const designationUIContext = useDesignationUIContext()
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
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreatePolicy"
  )

  return (
    <>

      <Card>
        <CardHeader title="">
          <BanksFilter />
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={DesignationUIProps.newDesignationButtonClick}
              >
                + Add Employee Policy
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
                    onClick={DesignationUIProps.newUserButtonClick}
                  >
                    Add New User
                  </button>
                )
              }
            })} */}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>

          <DesignationTable />
        </CardBody>
      </Card>
    </>
  )
}
