import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BankEditForm } from "./BankEditForm";
import { BankEditDialogHeader } from './BankEditDialogHeader'

import * as actions from "../../../_redux/bankActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBanksUIContext } from "../BanksUIContext";

export function BankEditDialog({ id, show, onHide, userForRead }) {
  const [action, setaction] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = "BankEditDialog";
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
    userForEdit: state.skills.userForEdit,
    roles: state.users.roles,
    centers: state.users.centers,
    userStatusTypes: state.users.userStatusTypes,
    isuserForRead: state.skills.userForRead,
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

  const saveSkills = async (user) => {

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
     await dispatch(actions.createSkills(user, disbaleLoading, onHide));
     await dispatch(actions.fetchUsers(usersUIProps.queryParams));


    } else {
      // const getUserStatus = userStatusTypes.find((item) => {
      //   return item.value === +user.status;
      // });


      // This object set for Edit/Save Fields in DB
      const skillUpdatedFields = {
        Id: user.Id,
        skill: user.skill,
        employeeId: user.employeeId,
        description: user.description,
        startDate: user.startDate,
        endDate: user.endDate,
        ratingScale: user.ratingScale
      };

     await dispatch(actions.updatedskills(skillUpdatedFields, disbaleLoading, onHide));
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
      <BankEditDialogHeader id={id} isUserForRead={userForRead} />
      <BankEditForm
        saveSkills={saveSkills}
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
