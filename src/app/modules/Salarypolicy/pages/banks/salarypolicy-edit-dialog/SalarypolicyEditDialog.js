import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SalarypolicyEditForm } from "./SalarypolicyEditForm";
import { SalarypolicyEditDialogHeader } from './SalarypolicyEditDialogHeader'

import * as actions from "../../../_redux/salarypolicyActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSalarypolicyUIContext } from "../SalarypolicyUIContext";

export function SalarypolicyEditDialog({ id, show, onHide, userForRead }) {
  const [action, setaction] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = "SalarypolicyEditDialog";
  const SalarypolicyUIContext = useSalarypolicyUIContext();
console.log("id for salary policy",id)
 
  const usersUIProps = useMemo(() => {
    return {
      queryParams: SalarypolicyUIContext.queryParams,
    };
  }, [SalarypolicyUIContext]);

  const banksUIProps = useMemo(() => {
    return {
      initUser: SalarypolicyUIContext.initUser,
      queryParams: SalarypolicyUIContext.queryParams,
    };
  }, [SalarypolicyUIContext]);

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
    userForEdit: state.salarypolicy.userForEdit,
    roles: state.users.roles,
    centers: state.users.centers,
    userStatusTypes: state.users.userStatusTypes,
    isuserForRead: state.salarypolicy.userForRead,
  }));

  console.log("for salary policy isuserForRead",userForEdit)
  // useEffect(() => {
  //   if (actionsLoading) {
  //     onHide();
  //   }
  // }, [actionsLoading === true]);

  //console.log("action", action);

  useEffect(() => {
    dispatch(actions.fetchUser(id));

    // dispatch(actions.fetchUser(banksUIProps.queryParams))
  }, [id, dispatch]);

  // useEffect(() => {
  //   console.log("UseEffect call");
  //   if (actionsLoading === false) {
  //     console.log("UseEffect call inside function");
  //     disbaleLoading();
  //   }
  // }, [actionsLoading]);
  //console.log("userForEdit", userForEdit);

  const saveBank = async (user) => {

    if (!id) {
      console.log("bank edit dialog");
      console.log(user);

      // const getUserStatus = userStatusTypes.filter((item) => {
      //   return item.value === +user.status;
      // });
      // //console.log("getUserStatus", getUserStatus);
      // const { status = getUserStatus[0].label, ...rest } = user;
      // const finalObject = {
      //   status: getUserStatus[0].label,
      //   ...rest,
      // };
      const finalObject = { user }
      dispatch(actions.salarypolicyBank(user, disbaleLoading, onHide));
      
      

    } else {
      // const getUserStatus = userStatusTypes.find((item) => {
      //   return item.value === +user.status;
      // });
     
      console.log("salary policy getUserStatus", user);

      const bankUpdatedFields = {
        Id: user.Id,
        type: user.type,
        value: user.value,
        multiplier: user.multiplier,
        divisor: user.divisor,
      };

      
      // const bankUpdatedFields = {
      //   Id: user.Id,
      //   Name: user.Name,
        
      // };
      console.log("salary policy getUserStatus", user);
      console.log("bankUpdatedFields", bankUpdatedFields);
     await dispatch(actions.updateSalarypolicy(bankUpdatedFields, disbaleLoading, onHide));
     await dispatch(actions.fetchUsers(usersUIProps.queryParams));
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <SalarypolicyEditDialogHeader id={id} isUserForRead={userForRead} />
      <SalarypolicyEditForm
        saveBank={saveBank}
        user={userForEdit || banksUIProps.initUser}
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