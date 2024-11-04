import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MasterEditForm } from "./MasterEditForm";
import { FormEditDialogHeader } from './FormEditDialogHeader'

import * as actions from "../../../_redux/formActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormUIContext } from "../FormUIContext";
import { FilterForm } from "./FilterForm";
import { fetchAllActiveEmployees, fetchAllFiscalYearData, fetchAllLeaveType } from "../../../../../../_metronic/redux/dashboardActions";

export function FormEditDialog() {
  const [loading, setLoading] = useState(false);
  const FormUIContext = useFormUIContext();

  const formUIProps = useMemo(() => {
    return {
      initUser: FormUIContext.initUser,
      filters: FormUIContext.filters,
      setfilters: FormUIContext.setfilters
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
    userForEdit,
    dashboard
  } = useSelector((state) => ({
    userForEdit: state.employee_leave_balance.userForEdit,
    dashboard: state.dashboard,
  }
  ));

  //Fetch record to edit on dialog load
  useEffect(() => {
    // dispatch(actions.fetchEditRecord(id));
    if (!dashboard?.allFiscalYears?.length)
      dispatch(fetchAllFiscalYearData("allFiscalYears"));
    if (!dashboard?.allLeaveTypes?.length)
      dispatch(fetchAllLeaveType("allLeaveTypes"));
    if (!dashboard.allEmployees || !dashboard.allEmployees.length)
      dispatch(fetchAllActiveEmployees());
  }, [dispatch]);

  //Fetch record to edit on dialog load
  useEffect(() => {
    dispatch(actions.fetchEditRecord(formUIProps.filters));
  }, [formUIProps.filters]);

  //Create or Update record according to values from dialog
  const submitForm = (values) => {
    dispatch(actions.saveRecord({...formUIProps.filters, allocatedCount: values.allocatedCount}, disbaleLoading))
  }

  console.log('::::::userForEdit::::::', userForEdit);


  return (
    <>
      <FilterForm
        filters={formUIProps.filters}
        setfilters={formUIProps.setfilters}
        dropdownData={{
          allFiscalYears: dashboard?.allFiscalYears,
          allLeaveTypes: dashboard?.allLeaveTypes,
          allEmployees: dashboard?.allEmployees,
        }}
      />
      <MasterEditForm
        submitForm={submitForm}
        user={userForEdit || formUIProps.initUser}
        enableLoading={enableLoading}
        loading={loading}
        isUserForRead={Boolean(!(formUIProps.filters?.employeeId && formUIProps.filters?.leaveType && formUIProps.filters?.yearId) || userForEdit?.Id)}
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
