import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FormEditForm } from "./FormEditForm";
import { FormEditDialogHeader } from "./FormEditDialogHeader";

import * as actions from "../../../_redux/redux-Actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormUIContext } from "../FormUIContext";
import { Accordion, Button, Card } from "react-bootstrap";
import { KeyboardArrowDown } from "@material-ui/icons";

export function FormEditDialog({ id, show, onHide, userForRead }) {
  const [action, setaction] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = "FormEditDialog";
  const FormUIContext = useFormUIContext();

  const usersUIProps = useMemo(() => {
    return {
      queryParams: FormUIContext.queryParams,
    };
  }, [FormUIContext]);

  const formUIProps = useMemo(() => {
    return {
      initUser: FormUIContext.initUser,
      queryParams: FormUIContext.queryParams,
      setIds: FormUIContext.setIds,
      employeeId: FormUIContext.employeeId,
      queryParams: FormUIContext.queryParams,
      isFileReq:FormUIContext.isFileReq,
      setIsFileReq:FormUIContext.setIsFileReq
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
    actionsLoading,
    user,
    userForEdit,
    roles,

    userStatusTypes,
    isuserForRead,
  } = useSelector((state) => ({
    actionsLoading: state.users.actionsLoading,
    user: state.users, // change for users to receipt
    userForEdit: state.employee_loan_request.userForEdit,
    roles: state.users.roles,
    userStatusTypes: state.users.userStatusTypes,
    isuserForRead: state.employee_loan_request.userForRead,
  }));


  useEffect(() => {
 
    dispatch(actions.fetchmoduledata(id));

    // dispatch(actions.fetchmoduledata(formUIProps .queryParams))
  }, [id, dispatch, show]);

  const saveForm = async (data, totalInstallments,setTotalInstallments ,resetForm) => {
    // enableLoading();

    formUIProps.setIds("");

    if (!data.Id && data) {
      data.total_installment=totalInstallments
      
        await dispatch(
          actions.createReimbursementClaim(data, disbaleLoading, resetForm)
        );
        await dispatch(actions.fetchReimbursementClaim(formUIProps));
        setTotalInstallments("")
    
    } else {
     
      const formUpdatedFields = {
        Id: data.Id,
        employeeId: data.employeeId,
        loan_typeId:data.loan_typeId,
        monthly_installment:data.monthly_installment,
        applied_date:data.applied_date,
        installment_start_date:data.installment_start_date,
        total_loan_amount:data.total_loan_amount,
        total_installment:totalInstallments,
        reason:data.reason, 
     
      };
     
        await dispatch(
          actions.updateReimbursementClaim(
            formUpdatedFields,
            disbaleLoading,
            resetForm
          )
        );
        await dispatch(actions.fetchReimbursementClaim(formUIProps));
        setTotalInstallments("")
      
    }
  };


  return (
    <>
      <FormEditDialogHeader id={id} isUserForRead={userForRead} />
      <FormEditForm
        saveForm={saveForm}
        user={userForEdit || formUIProps.initUser}
        onHide={onHide}
        roles={roles}
        userStatusTypes={userStatusTypes}
        isUserForRead={userForRead}
        enableLoading={enableLoading}
        loading={loading}
        setIds={formUIProps.setIds}
        isEdit={id ? true : false}
        isFileReq={formUIProps.isFileReq}
        setIsFileReq={formUIProps.setIsFileReq}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
