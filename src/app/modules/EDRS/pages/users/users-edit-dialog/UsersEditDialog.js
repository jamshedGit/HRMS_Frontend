import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { UserEditForm } from "./UsersEditForm";
import { UserEditDialogHeader } from "./UserEditDialogHeader";
import { useUsersUIContext } from "../UsersUIContext";
import * as actions from "../../../_redux/usersActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function UsersEditDialog({ id, show, onHide, userForRead }) {
  const [action, setaction] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = "UserEditDialog";
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      initUser: usersUIContext.initUser,
      queryParams: usersUIContext.queryParams,
    };
  }, [usersUIContext]);

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
    userForEdit: state.receipt.userForEdit,
    roles: state.users.roles,
    centers: state.users.centers,
    userStatusTypes: state.users.userStatusTypes,
    isuserForRead: state.receipt.userForRead,
  }));

  // useEffect(() => {
  //   if (actionsLoading) {
  //     onHide();
  //   }
  // }, [actionsLoading === true]);

  //console.log("action", action);

  useEffect(() => {
    dispatch(actions.fetchUser(id));

    // dispatch(actions.fetchUser(usersUIProps.queryParams))
  }, [id, dispatch]);

  // useEffect(() => {
  //   console.log("UseEffect call");
  //   if (actionsLoading === false) {
  //     console.log("UseEffect call inside function");
  //     disbaleLoading();
  //   }
  // }, [actionsLoading]);
  //console.log("userForEdit", userForEdit);

  const saveUser = (user) => {
   
    if (!id) {
      console.log("user edit dialog");
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
      dispatch(actions.createReceipt(user, disbaleLoading, onHide));
    } else {
      // const getUserStatus = userStatusTypes.find((item) => {
      //   return item.value === +user.status;
      // });

      console.log("getUserStatus", user);

      const userUpdatedFields = {
        receiptId: user.receiptId,
        receiptNo: user.receiptNo,
        donorName: user.donorName,
        bookNo: user.bookNo,
        phoneno:user.phoneno,
        bankName: user.bankName,
        description: user.description,
        clerkName: user.clerkName,
        type: user.type,
        // password: user.password,
        chequeNo: user.chequeNo,
        amount: user.amount,
        centerId: user.centerId,
        cityId: user.cityId,
        subCenterId: user.subCenterId,
      };

       console.log("userUpdatedFields", userUpdatedFields);
      dispatch(actions.updateUser(userUpdatedFields, disbaleLoading, onHide));
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <UserEditDialogHeader id={id} isUserForRead={userForRead} />
      <UserEditForm
        saveUser={saveUser}
        user={userForEdit || usersUIProps.initUser}
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
