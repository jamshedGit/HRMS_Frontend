import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BranchEditForm } from "./BranchEditForm";
import { BranchEditDialogHeader } from './BranchEditDialogHeader'

import * as actions from "../../../_redux/branchActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBranchUIContext } from "../BranchUIContext";

export function BranchEditDialog({ id, show, onHide, userForRead }) {
  const [action, setaction] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = "BranchEditDialog";
  const BranchsUIContext = useBranchUIContext();

 
  const usersUIProps = useMemo(() => {
    return {
      queryParams: BranchsUIContext.queryParams,
    };
  }, [BranchsUIContext]);

  const BranchsUIProps = useMemo(() => {
    return {
      initUser: BranchsUIContext.initUser,
      queryParams: BranchsUIContext.queryParams,
    };
  }, [BranchsUIContext]);

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
  } = useSelector((state) => {  return  ({
    
    actionsLoading: state.users.actionsLoading,
    user: state.users, // change for users to receipt
    userForEdit: state.branch.userForEdit,
    roles: state.users.roles,
    centers: state.users.centers,
    userStatusTypes: state.users.userStatusTypes,
    isuserForRead: state.branch.userForRead,
    
  })});

  // useEffect(() => {
  //   if (actionsLoading) {
  //     onHide();
  //   }
  // }, [actionsLoading === true]);

  //console.log("action", action);

  useEffect(() => {
    dispatch(actions.fetchUser(id));

    // dispatch(actions.fetchUser(BranchsUIProps.queryParams))
  }, [id, dispatch]);

  // useEffect(() => {
  //   console.log("UseEffect call");
  //   if (actionsLoading === false) {
  //     console.log("UseEffect call inside function");
  //     disbaleLoading();
  //   }
  // }, [actionsLoading]);
  //console.log("userForEdit", userForEdit);

  const saveBranch = (branch) => {

    if (!id) {
      console.log("Branch edit dialog");
      console.log(branch);

      const finalObject = { branch }
      dispatch(actions.createBranch(branch, disbaleLoading, onHide));

      dispatch(actions.fetchUsers(usersUIProps.queryParams));

    } else {
      // const getUserStatus = userStatusTypes.find((item) => {
      //   return item.value === +user.status;
      // });

      console.log("getUserStatus", branch);

      const BranchUpdatedFields = {
        Id: branch.Id,
        Name: branch.Name,
        bankName: branch.Name,
        branchCode:branch.branchCode,
        countryId: branch.countryId,
        cityId: branch.cityId,
        phone: branch.phone,
        fax: branch.fax,
        email: branch.email,
        contactPerson: branch.contactPerson,
        address : branch.address,
        accOpeningDate: branch.accOpeningDate,
        accNoOfSalary:branch.accNoOfSalary,
        accNoForPF: branch.accNoForPF,
        accNoForGrad: branch.accNoForGrad
      };

      console.log("BranchUpdatedFields", BranchUpdatedFields);
      dispatch(actions.updateBranch(BranchUpdatedFields, disbaleLoading, onHide));
      
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <BranchEditDialogHeader id={id} isUserForRead={userForRead} />
      <BranchEditForm
        saveBranch={saveBranch}
        user={userForEdit || BranchsUIProps.initUser}
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
