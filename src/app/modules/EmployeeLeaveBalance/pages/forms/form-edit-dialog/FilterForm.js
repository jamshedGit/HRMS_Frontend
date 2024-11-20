import React from "react";
import { Formik, Form, Field } from "formik";
import { Select } from "../../../../../../_metronic/_partials/controls";
import CustomDropdown from "../../../../../utils/common-modules/CustomDropdown";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";
import { Modal } from "react-bootstrap";

export function FilterForm({
  filters,
  setfilters,
  dropdownData
}) {

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={filters}
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          setFieldValue
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <fieldset>
                  <div className="from-group row">

                    {/* Employee Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="employeeId"
                        component={Select}
                        className={errors.employeeId && touched.employeeId ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.target.value == '--Select--' ? '' : Number(e.target.value)
                          setFieldValue('employeeId', value)
                          setfilters({...filters, employeeId: value})
                        }}
                        label={
                          <span>
                            {" "}
                            Employee<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.employeeId}
                        autoComplete="off"
                        children={CustomDropdown({ data: dropdownData.allEmployees, firstElement: { label: '--Select--', value: null } })}
                      />
                      {
                        errors.employeeId && touched.employeeId && <CustomErrorLabel touched={true} error={errors.employeeId} />
                      }
                    </div>
                    {/* Employee Field End */}

                    {/* Leave Type Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="leaveType"
                        component={Select}
                        className={errors.leaveType && touched.leaveType ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.target.value == '--Select--' ? '' : Number(e.target.value)
                          setFieldValue('leaveType', value)
                          setfilters({...filters, leaveType: value})
                        }}
                        label={
                          <span>
                            {" "}
                            Leave Type<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.leaveType}
                        autoComplete="off"
                        children={CustomDropdown({ data: dropdownData.allLeaveTypes })}
                      />
                      {
                        errors.leaveType && touched.leaveType && <CustomErrorLabel touched={true} error={errors.leaveType} />
                      }
                    </div>
                    {/* Leave Type Field End */}

                    {/* Year Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="yearId"
                        component={Select}
                        className={errors.yearId && touched.yearId ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.target.value == '--Select--' ? '' : Number(e.target.value)
                          setFieldValue('yearId', value)
                          setfilters({...filters, yearId: value})
                        }}
                        label={
                          <span>
                            {" "}
                            Year<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.yearId}
                        autoComplete="off"
                        children={CustomDropdown({ data: dropdownData.allFiscalYears, firstElement: { label: '--Select--', value: null } })}
                      />
                      {
                        errors.yearId && touched.yearId && <CustomErrorLabel touched={true} error={errors.yearId} />
                      }
                    </div>
                    {/* Year Field End */}

                  </div>
                </fieldset>
              </Form>
            </Modal.Body>
          </>
        )}
      </Formik>
    </>
  );
}
