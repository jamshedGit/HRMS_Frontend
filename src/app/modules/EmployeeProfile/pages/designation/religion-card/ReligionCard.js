import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { DesignationTable, ReligionTable } from "../designation-table/DesignationTable"
import { useDesignationUIContext } from "../DesignationUIContext"
import { BanksFilter } from "../bank-filter/BanksFIlter"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { useModal } from '../../../../../../context/ModalContext';
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName"
import { initialFilter } from "../ReligionUIHelpers"
import * as actions from "../../../_redux/designationActions";

export function ReligionCard() {
  const designationUIContext = useDesignationUIContext()
  const empUIContext = useDesignationUIContext()
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const DesignationUIProps = useMemo(() => {
    return {
      newAcademicButtonClick: designationUIContext.newAcademicButtonClick,
      newDesignationButtonClick: designationUIContext.newDesignationButtonClick,
      openEditDesignationDialog: designationUIContext.openEditDesignationDialog,
    }
  }, [designationUIContext])

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Profile
    }),
    shallowEqual
  )

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateProfile"
  )


  const DesignationUIContext = useDesignationUIContext();
  const usersUIProps = useMemo(() => {
    return {
      queryParams: DesignationUIContext.queryParams,
    };
  }, [DesignationUIContext]);


  const fetchInctive = () => {
    initialFilter.isActive = false

    dispatch(actions.fetchUsers(usersUIProps.queryParams));

  }

  const fetchActive = () => {
    initialFilter.isActive = true

    dispatch(actions.fetchUsers(usersUIProps.queryParams));

  }


  const handleOpenModal = () => {
    openModal(
      <div>
        <h2>Home Page Modal</h2>
        <p>This modal was opened from the HomePage.</p>
      </div>
    );
  };

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

                {initialFilter.isActive ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={fetchInctive}
                  >
                   Inactive Employee
                  </button>
                ) : (<button
                  type="button"
                  className="btn btn-primary"
                  onClick={fetchActive}
                >
                  Active Employee
                </button>
                )}





                {accessUser && (

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={DesignationUIProps.newDesignationButtonClick}
                  >
                    + Add Employee Profile
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
