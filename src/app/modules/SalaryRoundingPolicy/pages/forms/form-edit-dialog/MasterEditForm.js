import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";
import { getClassName } from "../../../../../utils/common";

//Validation for Form
const formValidation = Yup.object().shape({
  paymentMode: Yup.string().required('Please Select a Payment Mode'),
  amount: Yup.string().required('Please Enter an Amount').matches(/^\d+(\.\d+)?$/, 'Must be a valid number')
});

export function MasterEditForm({
  dropdownData,
  submitForm,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
}) {

  const dropdown = (data) => {
    return [{ Id: "", formName: "--Select Mode--" }, ...data].map((el) => {
      return (<>
        <option value={el.Id}>{el.formName}</option>
      </>)
    })
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={formValidation}
        onSubmit={(values) => {
          enableLoading();
          submitForm(values)
        }}
      >
        {({
          handleSubmit,
          errors,
          values,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <fieldset disabled={isUserForRead}>
                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="paymentMode"
                        component={Select}
                        className={errors.paymentMode && !values.paymentMode ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('paymentMode', e.target.value)
                        }}
                        label={
                          <span>
                            {" "}
                            Payment Mode<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.paymentMode}
                        autoComplete="off"
                        children={dropdown(dropdownData)}
                      />
                      {
                        errors.paymentMode && !values.paymentMode && <CustomErrorLabel touched={true} error={errors.paymentMode} />
                      }
                    </div>


                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="amount"
                        component={Input}
                        placeholder=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={
                          <span>
                            {" "}
                            Rounding Up to<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.amount}
                        autoComplete="off"
                      />

                    </div>


                  </div>
                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {!isUserForRead ? (
                <button
                  type="button"
                  onClick={onHide}
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

              <> </>
              {!isUserForRead && (
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
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
    </>
  );
}
