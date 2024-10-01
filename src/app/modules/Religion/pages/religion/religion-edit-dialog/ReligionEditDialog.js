import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BankEditForm } from "./ReligionEditForm";
import { ReligionEditDialogHeader } from './ReligionEditDialogHeader'

import * as actions from "../../../_redux/religionActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBanksUIContext } from "../ReligionUIContext";

export function ReligionEditDialog({ id, show, onHide, userForRead }) {
  const [action, setaction] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = "ReligionEditDialog";
  const banksUIContext = useBanksUIContext();

 
  const usersUIProps = useMemo(() => {
    return {
      queryParams: banksUIContext.queryParams,
    };
  }, [banksUIContext]);

  const banksUIProps = useMemo(() => {
    return {
      initUser: banksUIContext.initUser,
      queryParams: banksUIContext.queryParams,
    };
  }, [banksUIContext]);

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
    userForEdit: state.religion.userForEdit,
    roles: state.users.roles,
    centers: state.users.centers,
    userStatusTypes: state.users.userStatusTypes,
    isuserForRead: state.religion.userForRead,
  }));

  // useEffect(() => {
  //   if (actionsLoading) {
  //     onHide();
  //   }
  // }, [actionsLoading === true]);


  useEffect(() => {
    dispatch(actions.fetchUser(id));

    // dispatch(actions.fetchUser(banksUIProps.queryParams))
  }, [id, dispatch]);

  // useEffect(() => {
  //   if (actionsLoading === false) {
  //     disbaleLoading();
  //   }
  // }, [actionsLoading]);

  const saveReligion = (user) => {

    if (!id) {

      // const getUserStatus = userStatusTypes.filter((item) => {
      //   return item.value === +user.status;
      // });
      // const { status = getUserStatus[0].label, ...rest } = user;
      // const finalObject = {
      //   status: getUserStatus[0].label,
      //   ...rest,
      // };
      const finalObject = { user }
      dispatch(actions.createReligion(user, disbaleLoading, onHide));
      
      

    } else {
      // const getUserStatus = userStatusTypes.find((item) => {
      //   return item.value === +user.status;
      // });
     

      const religionUpdatedFields = {
        Id: user.Id,
        religionName: user.religionName,
        religionCode: user.religionCode
      };

      dispatch(actions.updateReligion(religionUpdatedFields, disbaleLoading, onHide));
      dispatch(actions.fetchUsers(usersUIProps.queryParams));
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ReligionEditDialogHeader id={id} isUserForRead={userForRead} />
      <BankEditForm
        saveReligion={saveReligion}
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
