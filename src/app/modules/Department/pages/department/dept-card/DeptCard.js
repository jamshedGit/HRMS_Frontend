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
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName"

export function DeptCard() {
  const DeptUIContext = useDeptUIContext()

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


  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateDept"
  )

  return (
    <>


      <Card>

        <CardHeader title={CurrentModuleName()} >

          <div className="d-flex justify-content-between align-items-center gap-3 m-4">



            <div className="pt-5">

              <DeptFilter />

            </div>

            <div className=" p-2">

              <CardHeaderToolbar>



                {accessUser && (

                  <button

                    type="button"

                    className="btn btn-primary"

                    onClick={DeptUIProps.newDeptButtonClick}

                  >

                    + Add Department

                  </button>

                )}





              </CardHeaderToolbar>

            </div>



          </div>

        </CardHeader>



        <CardBody>



          <DeptTable />

        </CardBody>

      </Card>


    </>
  )
}
