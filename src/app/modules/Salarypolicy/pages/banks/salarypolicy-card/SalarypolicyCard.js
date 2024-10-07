import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { BanksTable } from "../salarypolicy-table/BanksTable"
import { useSalarypolicyUIContext } from "../SalarypolicyUIContext"
import { SalarypolicyFIlter } from "../salarypolicy-filter/SalarypolicyFIlter"
import { useSelector, shallowEqual } from "react-redux"

export function SalarypolicyCard() {
  const SalarypolicyUIContext = useSalarypolicyUIContext()
  //console.log("SalarypolicyUIContext", SalarypolicyUIContext)
  const BanksUIProps = useMemo(() => {
    return {
      newBankButtonClick: SalarypolicyUIContext.newBankButtonClick,
      openEditBankDialog: SalarypolicyUIContext.openEditBankDialog,
    }
  }, [SalarypolicyUIContext])

  const { userAccess } = useSelector(
   
    (state) => ({
      
      userAccess: state.auth.userAccess.salarypolicy,
    }),
    shallowEqual
  )
  console.log("userAccess Temp",userAccess)
  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateSalarypolicy"
  )

  return (
    <>

      <Card>
        <CardHeader title="">
          <SalarypolicyFIlter />
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={BanksUIProps.newBankButtonClick}
              >
                + Add Salary Policy
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