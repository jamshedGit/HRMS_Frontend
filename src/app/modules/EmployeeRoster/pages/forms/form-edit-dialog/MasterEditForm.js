import React, { useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { DatePickerField, Select } from "../../../../../../_metronic/_partials/controls";
import CustomDropdown from "../../../../../utils/common-modules/CustomDropdown";
import { useSelector, shallowEqual } from "react-redux";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";
import EmployeeListTable from "./EmployeeListTable";
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";
import { formatDates } from "../../../../../utils/common";

export function MasterEditForm({
  submitForm,
  user,
  actionsLoading,
  enableLoading,
  loading,
  isEdit,
  setId
}) {

  //Get Data from states
  const { allEmployeeShifts, allEmployees, payrollData } = useSelector(
    (state) => ({
      payrollData: state.dashboard.payrollData,
      allEmployeeShifts: state.dashboard.allEmployeeShifts,
      allEmployees: state.dashboard.allEmployees,
    }),
    shallowEqual
  )

  //Function to check if the date doesn't lie before the payroll month date
  const checkPayrolMonth = (values, payroll) => {
    return payroll && payroll.startDate && values.from && new Date(payroll.startDate).getTime() > new Date(values.from).getTime();
  }

  //Form Validation according to Payroll Month and without it as well
  const formValidation = useMemo(() => {
    if (payrollData && payrollData.startDate) {
      return Yup.object().shape({
        from: Yup.date().required(VALIDATION_MESSAGES.required).min(payrollData.startDate, `Date cannot be before ${formatDates(payrollData.startDate)}`),
        to: Yup.date().required(VALIDATION_MESSAGES.required).min(Yup.ref('from'), 'To date cannot be before From date'),
        shiftId: Yup.number().required(VALIDATION_MESSAGES.required),
        list: Yup.array().of(
          Yup.object().shape({
            employeeId: Yup.number().required(VALIDATION_MESSAGES.required),
          })
        ).min(1, 'Choose atleast One Employee'),
      })
    }
    else {
      Yup.object().shape({
        from: Yup.date().required(VALIDATION_MESSAGES.required),
        to: Yup.date().required(VALIDATION_MESSAGES.required).min(Yup.ref('from'), 'To date cannot be before From date'),
        shiftId: Yup.number().required(VALIDATION_MESSAGES.required),
        list: Yup.array().of(
          Yup.object().shape({
            employeeId: Yup.number().required(VALIDATION_MESSAGES.required),
          })
        ).min(1, 'Choose atleast One Employee'),
      });
    }
  }, [payrollData])

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={formValidation}
        onSubmit={(values, { resetForm }) => {
          enableLoading();
          submitForm(values, resetForm)
        }}
      >
        {({
          handleSubmit,
          errors,
          values,
          handleBlur,
          handleChange,
          setFieldValue,
          touched,
          handleReset
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

                    {/* Date from Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="from"
                        disabled={isEdit}
                        component={DatePickerField}
                        dateFormat="dd/MM/yyyy"
                        label={
                          <span>
                            {" "}
                            Date From<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        onChange={(date) => {
                          setFieldValue('from', date)
                        }}
                        autoComplete="off"
                      />
                    </div>
                    {/* Date from Field End */}

                    {/* Date to Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="to"
                        disabled={isEdit}
                        component={DatePickerField}
                        dateFormat="dd/MM/yyyy"
                        label={
                          <span>
                            {" "}
                            Date To<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        onChange={(date) => {
                          setFieldValue('to', date)
                        }}
                        autoComplete="off"
                      />
                    </div>
                    {/* Date to Field End */}

                    {/* Shift Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="shiftId"
                        component={Select}
                        className={errors?.shiftId && touched?.shiftId ? 'form-control is-invalid' : 'form-control'}
                        disabled={checkPayrolMonth(values, payrollData)}
                        placeholder=""
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.target.value == '--Select--' ? '' : Number(e.target.value)
                          setFieldValue('shiftId', value)
                        }}
                        label={
                          <span>
                            {" "}
                            Shift<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.shiftId}
                        autoComplete="off"
                        children={CustomDropdown({ data: allEmployeeShifts, firstElement: { label: '--Select--', value: null } })}
                      />
                      {
                        errors.shiftId && touched.shiftId && <CustomErrorLabel touched={true} error={errors.shiftId} />
                      }
                    </div>
                    {/* Shift Field End */}

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    {/* Employee List Table Start */}
                    <div
                      style={{
                        backgroundColor: "rgb(235 243 255)",
                        padding: "20px",
                        borderRadius: "5px",
                        border: "2px solid #adceff",
                        width: '-webkit-fill-available'
                      }}
                    >
                      <EmployeeListTable
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        dropdownData={{
                          allEmployees
                        }}
                        isEdit={isEdit}
                      />
                    </div>
                    {/* Employee List Table End */}

                  </div>
                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="reset"
                onClick={() => {
                  setId()
                  handleReset()
                }}

                className="btn btn-danger btn-elevate"
              >
                Cancel
              </button>

              {!checkPayrolMonth(values, payrollData) && <button
                type="submit"
                disabled={!values?.list?.length}
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
                {loading && (
                  <span className="ml-3 mr-3 spinner spinner-white"></span>
                )}
              </button>}
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
