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
    centers,
    userStatusTypes,
    isuserForRead,
  } = useSelector((state) => ({
    
    
    actionsLoading: state.users.actionsLoading,
    user: state.users, // change for users to receipt
    userForEdit: state.tax_slab.userForEdit,
    roles: state.users.roles,
    centers: state.users.centers,
    userStatusTypes: state.users.userStatusTypes,
    isuserForRead: state.tax_slab.userForRead,
  }));

  console.log("for tax slab isuserForRead",userForEdit)


  useEffect(() => {
    dispatch(actions.fetchSalarypolicy(id));

    // dispatch(actions.fetchSalarypolicy(formUIProps .queryParams))
  }, [id, dispatch]);


  const saveForm = async (user) => {

    console.log("loan management conf getUserStatus", user);

    if (!id) {
 
  
      const finalObject = { user }
      dispatch(actions.createSalarypolicy(user, disbaleLoading, onHide));
      
      

    } else {

     
      console.log("salary policy getUserStatus", user);

      const formUpdatedFields = {
        Id: user.Id,
        subsidiaryId: user.subsidiaryId,
        accountId: user.accountId,
        human_resource_role: user.human_resource_role,
        emp_loan_account: user.emp_loan_account,
        installment_deduction_percentage: user.installment_deduction_percentage,
        installment_deduction_bases_type: user.type,
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
        centers={centers}
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
