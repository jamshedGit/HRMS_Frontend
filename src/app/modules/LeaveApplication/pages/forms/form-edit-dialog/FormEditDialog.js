import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MasterEditForm } from "./MasterEditForm";
import { FormEditDialogHeader } from './FormEditDialogHeader'

import * as actions from "../../../_redux/formActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormUIContext } from "../FormUIContext";

export function FormEditDialog({ id, employeeId }) {
  const [loading, setLoading] = useState(false);
  const FormUIContext = useFormUIContext();

  const formUIProps = useMemo(() => {
    return {
      initUser: FormUIContext.initUser,
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
    userForEdit,
    payrollData
  } = useSelector((state) => ({
    userForEdit: state.leave_application.userForEdit,
    payrollData: state.leave_application.payrollData
  }
  ));

  //Fetch record to edit on dialog load
  useEffect(() => {
    dispatch(actions.fetchEditRecord(id));

    if(!payrollData)
      dispatch(actions.getPayrollMonth());
  }, [id, dispatch]);
  

  //Create or Update record according to values from dialog
  const submitForm = (values, resetForm) => {
    if (values.fileDetail) {
      actions.uploadImage(values.fileDetail).then((res) => {
        dispatch(actions.saveRecord({ ...values, file: res.data.filename }, employeeId, disbaleLoading, resetForm))
      })
    }
    else {
      dispatch(actions.saveRecord(values, employeeId, disbaleLoading, resetForm))
    }
  }

  return (
    <>
      <FormEditDialogHeader />
      <MasterEditForm
        submitForm={submitForm}
        user={userForEdit || formUIProps.initUser}
        enableLoading={enableLoading}
        loading={loading}
        employeeId={employeeId}
        isEdit={id ? true : false}
        setId={formUIProps.setId}
        payrollData={payrollData}
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
