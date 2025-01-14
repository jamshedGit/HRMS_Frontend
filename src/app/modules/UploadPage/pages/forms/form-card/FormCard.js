import React from "react"
import {
  Card,
  CardBody,
  CardHeader
} from "../../../../../../_metronic/_partials/controls"
import { useDispatch, useSelector } from "react-redux";
import CurrentModuleName from "../../../../../utils/common-modules/ModuleName"
import { EmployeeProfileSection } from "../form-edit-dialog/EmployeeProfileSection"
import { EmployeeSalarySection } from "../form-edit-dialog/EmployeeSalarySection"
import { EmployeeLeaveSection } from "../form-edit-dialog/EmployeeLeaveSection"
import { EmployeeAttendanceSection } from "../form-edit-dialog/EmployeeAttendanceSection"
import { LoanOpeningSection } from "../form-edit-dialog/LoanOpeningBalanceSection"
import { IncomeTaxOpeningSection } from "../form-edit-dialog/IncomeTaxOpeningSection"
import * as actions from "../../../_redux/formActions";

export function FormCard() {
  const dispatch = useDispatch();

  const downloadExcel = (document, type, fileName) => {
    console.log('::::Download mein aya:::');
    
    dispatch(actions.downloadTemplate(document, type, fileName))
  }

  return (
    < Card >
      {/* Card Starts */}

      <CardBody>
        <CardHeader title={CurrentModuleName()} >
        </CardHeader>
        <br />

        {/* EmployeeProfileSection Starts */}
        <EmployeeProfileSection downloadExcel={downloadExcel}/>
        {/* EmployeeProfileSection Ends */}

        <br />
        <hr />

        {/* EmployeeSalarySection Starts */}
        <EmployeeSalarySection />
        {/* EmployeeSalarySection Ends */}

        <br />
        <hr />

        {/* EmployeeLeaveSection Starts */}
        <EmployeeLeaveSection />
        {/* EmployeeLeaveSection Ends */}

        <br />
        <hr />

        {/* EmployeeAttendanceSection Starts */}
        <EmployeeAttendanceSection />
        {/* EmployeeAttendanceSection Ends */}

        <br />
        <hr />

        {/* LoanOpeningSection Starts */}
        <LoanOpeningSection />
        {/* LoanOpeningSection Ends */}

        <br />
        <hr />

        {/* IncomeTaxOpeningSection Starts */}
        <IncomeTaxOpeningSection />
        {/* IncomeTaxOpeningSection Ends */}

      </CardBody>

      {/* Card Ends */}
    </Card >
  )
}
