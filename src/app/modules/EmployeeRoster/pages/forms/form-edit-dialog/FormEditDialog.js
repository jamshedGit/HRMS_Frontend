import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MasterEditForm } from "./MasterEditForm";

import * as actions from "../../../_redux/formActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormUIContext } from "../FormUIContext";
import { fetchAllActiveEmployees, fetchAllEmployeeShifts, getPayrollMonth } from "../../../../../../_metronic/redux/dashboardActions";

export function FormEditDialog() {
  const [loading, setLoading] = useState(false);
  const FormUIContext = useFormUIContext();

  const formUIProps = useMemo(() => {
    return {
      initUser: FormUIContext.initUser,
      queryParams: FormUIContext.queryParams,
      id: FormUIContext.id,
      setId: FormUIContext.setId,
    };
  }, [FormUIContext]);

  const enableLoading = () => {
    setLoading(true);
  };
  const disbaleLoading = () => {
    setLoading(false);
  };

  const dispatch = useDispatch();
  const {
    dashboard,
    userForEdit,
  } = useSelector((state) => ({
    dashboard: state.dashboard,
    userForEdit: state.employee_roster.userForEdit,
  }
  ));

  //Fetch record to edit on dialog load
  useEffect(() => {
    dispatch(actions.fetchEditRecord(formUIProps.id));

    if (!dashboard.allEmployees || !dashboard.allEmployees.length)
      dispatch(fetchAllActiveEmployees());
    if (!dashboard.allEmployeeShifts || !dashboard.allEmployeeShifts.length)
      dispatch(fetchAllEmployeeShifts('allEmployeeShifts'));
    if(!dashboard.payrollData)
      dispatch(getPayrollMonth('payrollData'));
  }, [formUIProps.id, dispatch]);

  //Create or Update record according to values from dialog
  const submitForm = (values, resetForm) => {
    dispatch(actions.saveRecord(values, formUIProps.id, disbaleLoading, resetForm))
  }

  return (
    <>
      <MasterEditForm
        submitForm={submitForm}
        user={userForEdit || formUIProps.initUser}
        isEdit={formUIProps.id ? true : false}
        enableLoading={enableLoading}
        loading={loading}
        setId={formUIProps.setId}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
