import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DeptEditForm } from "./DeptEditForm";
import { DeptEditDialogHeader } from './DeptEditDialogHeader'

import * as actions from "../../../_redux/deptActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDeptUIContext } from "../DeptUIContext";

export function DeptEditDialog({ id, show, onHide, userForRead }) {
  const [action, setaction] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = "DeptEditDialog";
  const DeptUIContext = useDeptUIContext();


  const usersUIProps = useMemo(() => {
    return {
      queryParams: DeptUIContext.queryParams,
    };
  }, [DeptUIContext]);

  const DeptUIProps = useMemo(() => {
    return {
      initUser: DeptUIContext.initUser,
      queryParams: DeptUIContext.queryParams,
    };
  }, [DeptUIContext]);

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
  } = useSelector((state) => {
    return ({

      actionsLoading: state.users.actionsLoading,
      user: state.users, // change for users to receipt
      userForEdit: state.dept.userForEdit,
      roles: state.users.roles,
      centers: state.users.centers,
      userStatusTypes: state.users.userStatusTypes,
      isuserForRead: state.dept.userForRead,

    })
  });

  // useEffect(() => {
  //   if (actionsLoading) {
  //     onHide();
  //   }
  // }, [actionsLoading === true]);

  //console.log("action", action);

  useEffect(() => {
    dispatch(actions.fetchUser(id));

    // dispatch(actions.fetchUser(DeptUIProps.queryParams))
  }, [id, dispatch]);

  // useEffect(() => {
  //   console.log("UseEffect call");
  //   if (actionsLoading === false) {
  //     console.log("UseEffect call inside function");
  //     disbaleLoading();
  //   }
  // }, [actionsLoading]);
  //console.log("userForEdit", userForEdit);

  const saveDept = (dept) => {

    if (!id) {
      console.log("department edit dialog");
      console.log(dept);

      const finalObject = { dept }
      dispatch(actions.createDept(dept, disbaleLoading, onHide));
      dispatch(actions.fetchUsers(usersUIProps.queryParams));

    } else {
      // const getUserStatus = userStatusTypes.find((item) => {
      //   return item.value === +user.status;
      // });

      console.log("getUserStatus", dept);

      const deptUpdatedFields = {
        deptId: dept.deptId,
        deptName: dept.deptName,
        deptCode: dept.deptCode,
        parentDept: dept.parentDept,
        subsidiary: dept.subsidiary,
        budgetStrength: dept.budgetStrength,
        chkParent: dept.parentDept == null ? true : false
      };

      console.log("deptUpdatedFields", deptUpdatedFields);
      dispatch(actions.updateDept(deptUpdatedFields, disbaleLoading, onHide));

    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <DeptEditDialogHeader deptId={id} isUserForRead={userForRead} />
      <DeptEditForm
        saveDept={saveDept}
        user={userForEdit || DeptUIProps.initUser}
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
