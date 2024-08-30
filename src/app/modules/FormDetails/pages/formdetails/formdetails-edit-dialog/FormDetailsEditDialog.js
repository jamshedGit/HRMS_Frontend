import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FormEditForm } from "./FormDetailsEditForm";
import { FormEditDialogHeader } from './FormDetailsEditDialogHeader'

import * as actions from "../../../_redux/formdetailsActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormUIContext } from "../FormDetailsUIContext";
import axios from "axios";
import { setData } from "../../../../../../_metronic/redux/tripLogTable/tripLogTableSlice";
export const USERS_URL = process.env.REACT_APP_API_URL;

export function FormEditDialog({ id, show, onHide, userForRead }) {
  const [action, setaction] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = "FormEditDialog";
  const formUIContext = useFormUIContext();
  const [list, setList] = useState([]);
  const { auth, formDetails} = useSelector((state) => state);
  const FormUIProps = useMemo(() => {
    return {
      initUser: formUIContext.initUser,
      queryParams: formUIContext.queryParams,
    };
  }, [formUIContext]);

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
    userForEdit: state.formDetails.userForEdit,
    roles: state.users.roles,
    centers: state.users.centers,
    userStatusTypes: state.users.userStatusTypes,
    isuserForRead: state.formDetails.userForRead,
  }));

  const [ menuParentId,setFormParentId ] = useState(null)
  // useEffect(() => {
  //   if (actionsLoading) {
  //     onHide();
  //   }
  // }, [actionsLoading === true]);

  //console.log("action", action);

  useEffect(() => {
    dispatch(actions.fetchUser(id));

    // dispatch(actions.fetchUser(FormUIProps.queryParams))
  }, [id, dispatch]);

  // useEffect(() => {
  //   console.log("UseEffect call");
  //   if (actionsLoading === false) {
  //     console.log("UseEffect call inside function");
  //     disbaleLoading();
  //   }
  // }, [actionsLoading]);
  //console.log("userForEdit", userForEdit);

  const saveReligion = async (user) => {

    if (!id) {
      console.log("relegion save");
      console.log(user);
      
      console.log("party",formDetails.currentId);
      
      user.parentFormID = formDetails.currentId
      const finalObject = { user }
     await dispatch(actions.createform(user, disbaleLoading, onHide));
      console.log("create form details", finalObject);
     await dispatch(actions.customfetchFormDetail(formDetails.currentId));
    } else {
      // const getUserStatus = userStatusTypes.find((item) => {
      //   return item.value === +user.status;
      // });

      console.log("getUserStatus", user);
      
      const formUpdatedFields = {
        Id: user.Id,
        formName: user.formName,
        formCode: user.formCode,
        parentFormID: user.parentFormID
      };
      const parentId = user.parentFormID;
      console.log("formUpdatedFields", formUpdatedFields);
      await dispatch(actions.updateForm(formUpdatedFields, disbaleLoading, onHide));
      dispatch(actions.customfetchFormDetail(parentId));
      // const parentId = user.parentFormID;
      // const response = await axios.post(`${USERS_URL}/formdetails/read-all-child-forms`, { parentId });

      // console.log("child jason data 1", response);
      //setData(response?.data?.data?.rows || []);
      
    //  console.log("test", entities);
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
        saveReligion={saveReligion}
        user={userForEdit || FormUIProps.initUser}
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
