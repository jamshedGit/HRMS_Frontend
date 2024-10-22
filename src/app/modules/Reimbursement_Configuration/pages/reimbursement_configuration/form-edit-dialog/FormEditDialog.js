

import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FormEditForm } from "./FormEditForm";
import { FormEditDialogHeader } from './FormEditDialogHeader'
 
import * as actions from "../../../_redux/redux-Actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormUIContext } from "../FormUIContext";
 
 
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
 
  const formUIProps  = useMemo(() => {
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
    actionsLoading,
    user,
    userForEdit,
    roles,
 
    userStatusTypes,
    isuserForRead,
  } = useSelector((state) => ({
   
   
    actionsLoading: state.users.actionsLoading,
    user: state.users, // change for users to receipt
    userForEdit: state.reimbursement_configuration
    .userForEdit,
    roles: state.users.roles,
    userStatusTypes: state.users.userStatusTypes,
    isuserForRead: state.reimbursement_configuration
    .userForRead,
  }));
 
  console.log("for  isuserForRead",userForEdit)
 
 
  useEffect(() => {
    console.log("fetch loan show",show,id);
    dispatch(actions.fetchSalarypolicy(id));
 
    // dispatch(actions.fetchSalarypolicy(formUIProps .queryParams))
  }, [id, dispatch,show]);
 
 
  const saveForm = async (user) => {
 
    console.log("loan management conf getUserStatus updated", user.details);
    // const loanTypeIds = user.details.map((detail) => detail.loan_typeId);

    // Check for duplicate loan_typeId values
    // const hasDuplicates = loanTypeIds.length !== new Set(loanTypeIds).size;
  
    // if (hasDuplicates) {
    //   toast.error("Duplicate loan types are not allowed. Please ensure each loan type is unique.", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   return

    // }

       if (user.details=="") {
      toast.error("Detail is incomplete.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return

    }
 
 
    if (!user.Id) {
 
 
      const finalObject = { user }
      dispatch(actions.createSalarypolicy(user, disbaleLoading, onHide));
     
     
 
    } else {
 
     
      console.log("reimbursement configuration", user);
 
      const formUpdatedFields = {
        Id: user.Id,
        subsidiaryId: user.subsidiaryId,
        payroll_groupId: user.payroll_groupId,
        cycle_typeId: user.cycle_typeId,
        details: user.details
        // loan_type: user.loan_type,
        // max_loan_amount: user.max_loan_amount,
        // salary_count: user.salary_count,
      };

  
 
     await dispatch(actions.updateSalarypolicy(formUpdatedFields, disbaleLoading, onHide));
     await dispatch(actions.fetchSalarypolicies(usersUIProps.queryParams));
    }
  };
 
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <FormEditDialogHeader id={id} isUserForRead={userForRead} />
      <FormEditForm
        saveForm={saveForm}
        user={userForEdit || formUIProps .initUser}
        onHide={onHide}
        roles={roles}
        userStatusTypes={userStatusTypes}
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
 