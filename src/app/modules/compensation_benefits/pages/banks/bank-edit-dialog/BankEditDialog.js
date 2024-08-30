import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BankEditForm } from "./BankEditForm";
import { BankEditDialogHeader } from './BankEditDialogHeader'

import * as actions from "../../../_redux/bankActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBanksUIContext } from "../BanksUIContext";
import axios from 'axios';
export const USERS_URL = process.env.REACT_APP_API_URL;

export function BankEditDialog({ id, show, onHide, userForRead }) {
  const [action, setaction] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = "EarningEditDialog";
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
    userForEdit: state.compensation.userForEdit,
    roles: state.users.roles,
    centers: state.users.centers,
    userStatusTypes: state.users.userStatusTypes,
    isuserForRead: state.compensation.userForRead,
  }));

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

  const saveCompensationBenefits = async (user,earning_deduction_Obj) => {

    if (!id) {
      console.log("stoppage_allowance edit dialog");
      console.log(user);

   
      const finalObject = { user }
      await dispatch(actions.createCompensationBenefits(user,earning_deduction_Obj, disbaleLoading, onHide));
      await dispatch(actions.fetchUsers(usersUIProps.queryParams));


    } else {
      // const getUserStatus = userStatusTypes.find((item) => {
      //   return item.value === +user.status;
      // });

      console.log("getUserStatus", user);

      // This object set for Edit/Save Fields in DB
      const updateCompensationBenefitsObj = {
        Id: user.Id,
        subsidiaryId : user.subsidiaryId,
        gradeId : user.gradeId,
        employeeTypeId: user.employeeTypeId,
        currencyId: user.currencyId,
        salaryMethod : user.salaryMethod,
        basicFactor : user.basicFactor,
        isPartOfGrossSalary: user.isPartOfGrossSalary,
        earningId : user.earningId,
        deductionId : user.deductionId,
        gratuity_member : user.gratuity_member,
        overtime_allowance : user.overtime_allowance,
        shift_allowance : user.shift_allowance,
        regularity_allowance : user.regularity_allowance,
        punctuality_allowance : user.punctuality_allowance,
        pf_member : user.pf_member,
        eobi_member : user.eobi_member,
        social_security_member : user.social_security_member,
        pension_member : user.pension_member

      };

      console.log("updateCompensationBenefits updated", updateCompensationBenefitsObj);
      await dispatch(actions.updateCompensationBenefits(updateCompensationBenefitsObj, disbaleLoading, onHide));
      await dispatch(actions.fetchUsers(usersUIProps.queryParams));
      console.log("earninglist",earning_deduction_Obj);
      const list = earning_deduction_Obj.map(res => {

        return {
          ...res,
         compensationId: user.Id, createdBy: user.createdBy, createdAt: user.createdAt, isActive: true
        }

      })
      console.log("arrayList", list);
      const response = axios.post(`${USERS_URL}/compensation/update-compensation-heads-bulk`, { data: {list , compensationId: user.Id }});
      console.log("bulk res", response);
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
        saveCompensationBenefits={saveCompensationBenefits}
        user={userForEdit || banksUIProps.initUser}
        onHide={onHide}
        roles={roles}
        centers={centers}
        userStatusTypes={userStatusTypes}
        isUserForRead={userForRead}
        enableLoading={enableLoading}
        loading={loading}
        id={id}
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
