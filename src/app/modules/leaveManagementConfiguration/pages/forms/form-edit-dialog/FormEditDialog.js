import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MasterEditForm } from "./MasterEditForm";
import { FormEditDialogHeader } from './FormEditDialogHeader'

import * as actions from "../../../_redux/formActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormUIContext } from "../FormUIContext";
import { fetchAllFormsMenu } from "../../../../../../_metronic/redux/dashboardActions";

export function FormEditDialog({ id, show, onHide, userForRead }) {
  const [loading, setLoading] = useState(false);
  const FormUIContext = useFormUIContext();

  const formUIProps = useMemo(() => {
    return {
      initUser: FormUIContext.initUser,
      queryParams: FormUIContext.queryParams,
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
    userForEdit: state.leave_management_configuration.userForEdit,
    dashboard: state.dashboard
  }
  ));

  //Fetch record to edit on dialog load
  useEffect(() => {
    // dispatch(actions.fetchEditRecord(id));
    if (!dashboard?.allEmployeeGradeList || !dashboard?.allEmployeeGradeList?.length)
      dispatch(fetchAllFormsMenu(143, "allEmployeeGradeList"));
    if (!dashboard?.allEmpTypeChildMenus || !dashboard?.allEmpTypeChildMenus?.length)
      dispatch(fetchAllFormsMenu(88, "allEmpTypeChildMenus"));
    if (!dashboard?.allSubidiaryList || !dashboard?.allSubidiaryList?.length)
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList"));
  }, [id, dispatch]);

  //Create or Update record according to values from dialog
  const submitForm = (values) => {
    //Converting Type to Number format for server
    dispatch(actions.saveRecord({ ...values, type: Number(values.type) }, id, disbaleLoading, onHide))
  }

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <FormEditDialogHeader id={id} isUserForRead={userForRead} />
      <MasterEditForm
        submitForm={submitForm}
        user={userForEdit || formUIProps.initUser}
        onHide={onHide}
        isUserForRead={userForRead}
        enableLoading={enableLoading}
        loading={loading}
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
    </Modal>
  );
}
