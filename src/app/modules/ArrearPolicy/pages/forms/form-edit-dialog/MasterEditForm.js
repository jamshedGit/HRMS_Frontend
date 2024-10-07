import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";

const formValidation = Yup.object().shape({
  type: Yup.number().required('Type is required').min(0, 'Type is required'),
  divisor: Yup.number()
    .when('type', {
      is: 2, // if select value is 2
      then: Yup.number().required('Divisor is required'),
      otherwise: Yup.number().notRequired(),
    }),
  multiplier: Yup.number()
    .when('type', {
      is: 2, // if select value is 2
      then: Yup.number().required('Multiplier is required'),
      otherwise: Yup.number().notRequired(),
    }),
  days: Yup.number()
    .when('type', {
      is: 3, // if select value is 3
      then: Yup.number().required('Days are required'),
      otherwise: Yup.number().notRequired(),
    }),
});

export function MasterEditForm({
  submitForm,
  user,
  actionsLoading,
  onHide,
  isUserForRead,
  enableLoading,
  loading,
}) {

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
          touched,
          values,
          handleBlur,
          handleChange,
          setFieldValue,
          formik,
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
                        name="type"
                        component={Select}
                        touched={false}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('type', e.target.value)
                        }}
                        label={
                          <span>
                            {" "}
                            Type<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.type}
                        autoComplete="off"
                        children={
                          <>
                            <option value={-1}>--Select--</option>
                            <option value={1}>Month Days</option>
                            <option value={2}>Ratio Of Years</option>
                            <option value={3}>Fixed Days</option>
                          </>}
                      />
                      {
                        errors.type && <CustomErrorLabel touched={true} error={errors.type} />
                      }
                    </div>

                    {
                      values.type == 2 &&
                      <>


                        <div className="col-12 col-md-4 mt-3">
                          <Field
                            name="divisor"
                            component={Input}
                            placeholder=""
                            touched={false}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={
                              <span>
                                {" "}
                                Divisor<span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            value={values.divisor}
                            autoComplete="off"
                          />

                        </div>

                        <div className="col-12 col-md-4 mt-3">
                          <Field
                            name="multiplier"
                            component={Input}
                            placeholder=""
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={
                              <span>
                                {" "}
                                Multiplier<span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            value={values.multiplier}
                            autoComplete="off"
                          />

                        </div>
                      </>
                    }

                    {
                      values.type == 3 &&
                      <>
                        <div className="col-12 col-md-4 mt-3">
                          <Field
                            name="days"
                            component={Input}
                            touched={false}
                            placeholder=""
                            value={values.days}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={
                              <span>
                                {" "}
                                Days<span style={{ color: "red" }}>*</span>
                              </span>
                            }
                            autoComplete="off"
                          />
                        </div></>
                    }
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
