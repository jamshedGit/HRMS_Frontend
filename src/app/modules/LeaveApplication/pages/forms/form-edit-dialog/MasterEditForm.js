import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { DatePickerField, Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";
import { useSelector, shallowEqual } from "react-redux"
import CustomDropdown from "../../../../../utils/common-modules/CustomDropdown";
import { uploadImage } from "../../../_redux/formActions";
import { getDateDiffInDays } from "../../../../../utils/common";

//Validation for Form
const formValidation = Yup.object().shape({
  from: Yup.date().required('Required'),
  to: Yup.date().required('Required').min(Yup.ref('from'), 'To date cannot be before From date'),
  leaveType: Yup.number().required('Required'),
  days: Yup.number().optional(),
  remarks: Yup.string().required('Required'),
});

export function MasterEditForm({
  submitForm,
  user,
  actionsLoading,
  enableLoading,
  loading,
  isEdit
}) {

  const { allLeaveTypes } = useSelector(
    (state) => ({
      allLeaveTypes: state.dashboard.allLeaveTypes
    }),
    shallowEqual
  )

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={formValidation}
        onSubmit={(values) => {
          console.log(':::on submit:::::', values);
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
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <fieldset>
                  <div className="from-group row">

                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="from"
                        component={DatePickerField}
                        disabled={isEdit}
                        label={
                          <span>
                            {" "}
                            Date From<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="to"
                        component={DatePickerField}
                        disabled={isEdit}
                        label={
                          <span>
                            {" "}
                            Date To<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="leaveType"
                        component={Select}
                        disabled={isEdit}
                        className={errors?.leaveType && touched?.leaveType ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.target.value == '--Select--' ? null : Number(e.target.value)
                          setFieldValue('leaveType', value)
                        }}
                        label={
                          <span>
                            {" "}
                            Leave Type<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.leaveType}
                        autoComplete="off"
                        children={CustomDropdown({ data: allLeaveTypes })}
                      />
                      {
                        errors.leaveType && touched.leaveType && <CustomErrorLabel touched={true} error={errors.leaveType} />
                      }
                    </div>
                  </div>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="days"
                        component={Input}
                        disabled={true}
                        type="number"
                        min="0"
                        className='form-control'
                        onChange={handleChange}
                        label={
                          <span>
                            {" "}
                            Days
                          </span>
                        }
                        value={getDateDiffInDays(values.from, values.to)}
                      />
                    </div>
                  </div>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="remarks"
                        component={TextArea}
                        placeholder=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={
                          <span>
                            {" "}
                            Remarks<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.remarks}
                        autoComplete="off"
                      />
                      {
                        errors.remarks && touched.remarks && <CustomErrorLabel touched={true} error={errors.remarks} />
                      }
                    </div>
                  </div>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="file"
                        component={Input}
                        type="file"
                        placeholder=""
                        onChange={(el) => {
                          setFieldValue('fileDetail', el.target.files[0])
                          handleChange(el)
                        }}
                        onBlur={handleBlur}
                        label={
                          <span>
                            {" "}
                            Attachment<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
          </>
        )}
      </Formik >
    </>
  );
}
