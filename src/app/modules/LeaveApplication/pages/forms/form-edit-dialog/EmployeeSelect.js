import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import { useSelector, shallowEqual } from "react-redux"
import CustomDropdown from "../../../../../utils/common-modules/CustomDropdown";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";

//Validation for Form
const formValidation = Yup.object().shape({
  employeeId: Yup.number().min(1, 'Required').required('Required'),
});


export function EmployeeSelect({
  actionsLoading,
  setemployeeId
}) {

  const { allEmployees } = useSelector(
    (state) => ({
      allEmployees: state.dashboard.allEmployees
    }),
    shallowEqual
  )
  return (
    <>
      <Formik
        enableReinitialize={true}
        validationSchema={formValidation}
        initialValues={{}}
      >
        {({
          errors,
          values,
          handleBlur,
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
                        name="employeeId"
                        component={Select}
                        className={errors.employeeId && !values.employeeId ? 'form-control is-invalid' : 'form-control'}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.target.value == '--Select--' ? null : Number(e.target.value)
                          setFieldValue('employeeId', value)
                          setemployeeId(value)
                        }}
                        label={
                          <span>
                            {" "}
                            Employee<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.employeeId}
                        autoComplete="off"
                        children={CustomDropdown({ data: allEmployees, firstElement: { label: '--Select--', value: '' } })}
                      />
                      {
                        errors.employeeId && <CustomErrorLabel touched={true} error={errors.employeeId} />
                      }
                    </div>
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
