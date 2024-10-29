

import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FormEditForm } from "./FormEditForm";
import { FormEditDialogHeader } from './FormEditDialogHeader'
 
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
    userForEdit: state.reimbursement_claim
    .userForEdit,
    roles: state.users.roles,
    userStatusTypes: state.users.userStatusTypes,
    isuserForRead: state.reimbursement_claim
    .userForRead,
  }));
 

 
 
  useEffect(() => {
   
    dispatch(actions.fetchmoduledata(id));
 
    // dispatch(actions.fetchmoduledata(formUIProps .queryParams))
  }, [id, dispatch,show]);
 
 
  const saveForm = async (user) => {
 
    console.log("save user",user)


    //    if (user.policies=="" ) {
    //   toast.error("Detail is incomplete.", {
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
 
 
    if (!user.Id) {
 
 console.log("save user",user)
      const finalObject = { user }
      dispatch(actions.createSalarypolicy(user, disbaleLoading, onHide));
     
     
 
    } else {
 
     

 
      const formUpdatedFields = {
        Id: user.Id,
        reimbursement_typeId: user.reimbursement_typeId,
        employeeId: user.employeeId,
        details: user.details,
        date: user.date,
        amount: user.amount,
        // reimbursement_configurationId: user.reimbursement_configurationId,

      };

 
     await dispatch(actions.updateSalarypolicy(formUpdatedFields, disbaleLoading, onHide));
     await dispatch(actions.fetchSalarypolicies(usersUIProps.queryParams));
    }
  };
 
  return (
    <Accordion defaultActiveKey="">
    <Card
      size="xl"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
 <Card.Header className="d-flex justify-content-center">
        <div className='accordion-header-btn w-100  d-flex justify-content-center'>
          <Accordion.Toggle as={Button} eventKey="0" >
            Enter Reimbursement Detail
            <KeyboardArrowDown />
          </Accordion.Toggle>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
        <Card.Body>

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
        </Card.Body>
        </Accordion.Collapse>
    </Card>
    </Accordion>
  );
}
 