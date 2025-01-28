import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import {
  DatePickerField,
  Input,
  Select,
  TextArea,
} from "../../../../../../_metronic/_partials/controls";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/redux-Actions";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import {
  amountLimit,
  formatDates,
  getDateDiffInDays,
  getFileName,
  getUploadUrl,
} from "../../../../../utils/common";

import { VALIDATION_MESSAGES } from "../../../../../utils/constants";



const ReimbursementSchema = Yup.object().shape({
  // email: Yup.string().required(VALIDATION_MESSAGES.required),
  password: Yup.string().required(VALIDATION_MESSAGES.required),
  currentPassword: Yup.string().required(VALIDATION_MESSAGES.required),
});

export function FormEditForm({
  saveForm,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
  setIds,
  isEdit,

}) {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);



   const currentUser = useSelector((state) => {
     return state.auth.user; // Directly access the user from state.auth
   });
 





  return (
    <Formik
      // key={user.Id || "new"}
      enableReinitialize={true}
      initialValues={user}
      validationSchema={ReimbursementSchema}
      onSubmit={(values, { resetForm }) => {
        enableLoading();
        saveForm(values,currentUser);
      }}
    >
      {({
        handleSubmit,
        errors,
        touched,
        values,
        setFieldValue,
        handleReset,

      }) => (
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            {actionsLoading && (
              <div className="overlay-layer bg-transparent">
                <div className="spinner spinner-lg spinner-success" />
              </div>
            )}
            <Form className="form form-label-right" onSubmit={handleSubmit}>
              <fieldset disabled={isUserForRead}>
                <div className="form-group row">
             

                 <div className="col-12 col-md-6 mt-3">
                                <label>
                                  Email : {currentUser.email} <span style={{ color: "red" }}>*</span>
                                </label>
                                <Field
                                  name="email"
                                  component={Input}
                                  placeholder="example@gmail.com"
            
                                  autoComplete="off"
                                  maxLength="30"
            
                                />
                              </div>
            
                           <div className="col-12 col-md-6 mt-3">
                                <label>
                                  Current Password <span style={{ color: "red" }}>*</span>
                                </label>
                                <Field
                                  name="currentPassword"
                                  component={Input} // Custom component
                                  // disabled={id}
                                  placeholder="Current password"
                                  type="text"
            
                                />
                              </div>
                              <div className="col-12 col-md-6 mt-3">
                                <label>
                                  New Password <span style={{ color: "red" }}>*</span>
                                </label>
                                <Field
                                  name="password"
                                  component={Input} // Custom component
                                  // disabled={id}
                                  placeholder="New password"
                                  type="text"
            
                                />
                              </div>
                  

                  
                </div>
              </fieldset>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            {/* Cancel / Ok Button */}
            {!isUserForRead ? (
              <button
                type="reset"
                onClick={() => {
                  setIds("");
                  handleReset();
                
                 
                }}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={onHide}
                className="btn btn-primary btn-elevate"
              >
                Ok
              </button>
            )}

            {/* Save Button */}
            {/* {!isUserForRead || !isActiveMonth && ( */}
            {

             true




              && (
                <button
                  type="submit"
                  // onClick={() => handleSubmit()}
                  onClick={() => {
                    handleSubmit();
                  }}
                 
                >
                  Save
                  {loading && (
                    <span className="ml-3 mr-3 spinner spinner-white"></span>
                  )}
                </button>
              )}
          </Modal.Footer>
        </>
      )}
    </Formik>
  );
}
