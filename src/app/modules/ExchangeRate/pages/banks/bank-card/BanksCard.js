import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { BanksTable } from "../bank-table/BanksTable"
import { useBanksUIContext } from "../BanksUIContext"
import { BanksFilter } from "../bank-filter/BanksFIlter"
import { useSelector, shallowEqual } from "react-redux"

export function BanksCard() {
  const banksUIContext = useBanksUIContext()
  //console.log("banksUIContext", banksUIContext)
  const BanksUIProps = useMemo(() => {
    return {
      newBankButtonClick: banksUIContext.newBankButtonClick,
      openEditBankDialog: banksUIContext.openEditBankDialog,
    }
  }, [banksUIContext])

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Exchange,
    }),
    shallowEqual
  )
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateExchangeRate"
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
                onClick={BanksUIProps.newBankButtonClick}
              >
                + Add Exchange Rate
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
                    onClick={BanksUIProps.newUserButtonClick}
                  >
                    Add New User
                  </button>
                )
              }
            })} */}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>

          <BanksTable />
        </CardBody>
      </Card>
    </>
  )
}
