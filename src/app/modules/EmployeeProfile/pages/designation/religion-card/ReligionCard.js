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
import { useModal } from '../../../../../../context/ModalContext';

export function ReligionCard() {
  const designationUIContext = useDesignationUIContext()
  const { openModal } = useModal();
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
        <CardHeader title="">
          <BanksFilter />
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={DesignationUIProps.newDesignationButtonClick}
              >
                + Add Employee Profile
              </button>
              // <button onClick={DesignationUIProps.newAcademicButtonClick}>Open Modal from HomePage</button>
              
            ) : (
              <> </>
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
