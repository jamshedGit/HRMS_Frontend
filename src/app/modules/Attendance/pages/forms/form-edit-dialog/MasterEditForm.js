import React, { useMemo } from "react";
import { Accordion, Button, Card, Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Checkbox, DatePickerField, Input, Select, TextArea } from "../../../../../../_metronic/_partials/controls";
import { useSelector, shallowEqual } from "react-redux";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";
import CustomDropdown from "../../../../../utils/common-modules/CustomDropdown";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";
import EmployeeProfile from "../../../../../utils/common-modules/EmployeeProfile";
import { KeyboardArrowDown } from "@material-ui/icons";

//Validations for Form
const formValidation = Yup.object().shape({
  employeeId: Yup.number().required(VALIDATION_MESSAGES.required),
  attDateIn: Yup.date().required(VALIDATION_MESSAGES.required),
  attDateOut: Yup.date().required(VALIDATION_MESSAGES.required).min(Yup.ref('attDateIn'), 'Date Out cannot be before Date in date'),
  timeIn: Yup.string().required(VALIDATION_MESSAGES.required).matches(
    /^(?:[01]\d|2[0-3])[0-5]\d$/,
    'Time must be in HHMM format and valid 24-hour format'
  ),
  timeOut: Yup.string().required(VALIDATION_MESSAGES.required).matches(
    /^(?:[01]\d|2[0-3])[0-5]\d$/,
    'Time must be in HHMM format and valid 24-hour format'
  ),
  comments: Yup.string().required(VALIDATION_MESSAGES.required),
});

export function MasterEditForm({
  submitForm,
  user,
  actionsLoading,
  isUserForRead,
  enableLoading,
  loading,
  setfilters
}) {

  const { allEmployees, allEmployeeShifts } = useSelector(
    (state) => ({
      allEmployees: state.dashboard.allEmployees,
      allEmployeeShifts: state.dashboard.allEmployeeShifts
    }),
    shallowEqual
  )

  const allEmployeesMap = useMemo(() => {
    return new Map(allEmployees?.map(item => [item.value, item]));
  }, [allEmployees]);

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
                <fieldset disabled={isUserForRead}>
                  <div className="from-group row">

                    {/* Employee Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="employeeId"
                        component={SearchSelect}
                        className={errors?.employeeId && touched?.employeeId ? 'form-control is-invalid' : 'form-control'}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const value = e.value == '--Select--' ? '' : Number(e.value)
                          setFieldValue('employeeId', value)
                          setfilters((prevState) => ({
                            ...prevState,
                            employeeId: value,
                          }));
                        }}
                        label={
                          <span>
                            {" "}
                            Employee<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={allEmployeesMap?.get(values?.employeeId || '') || ''}
                        autoComplete="off"
                        options={allEmployees}
                      />
                      {
                        errors.employeeId && touched.employeeId && <CustomErrorLabel touched={true} error={errors.employeeId} />
                      }
                    </div>
                    {/* Employee Field End */}
                  </div>

                  <br />
                  <hr />

                  {/* EmployeeProfile Starts */}
                  <EmployeeProfile employeeId={values.employeeId} />
                  {/* EmployeeProfile Ends */}

                  <hr />
                  <br />

                  <div className="from-group row">

                    {/* Date In Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="attDateIn"
                        component={DatePickerField}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => {
                          setFieldValue('attDateIn', date)
                          setfilters((prevState) => ({
                            ...prevState,
                            attDateIn: date,
                          }));
                        }}
                        label={
                          <span>
                            {" "}
                            Date In<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        autoComplete="off"
                      />
                    </div>
                    {/* Date In Field End */}

                    {/* Date Out Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="attDateOut"
                        component={DatePickerField}
                        dateFormat="dd/MM/yyyy"
                        label={
                          <span>
                            {" "}
                            Date Out<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        autoComplete="off"
                      />
                    </div>
                    {/* Date Out Field End */}

                    {/* Time In Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="timeIn"
                        component={Input}
                        maxlength="4"
                        label={
                          <span>
                            {" "}
                            Time In<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        autoComplete="off"
                      />
                    </div>
                    {/* Time In Field End */}

                    {/* Time Out Field Start */}
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="timeOut"
                        component={Input}
                        maxlength="4"
                        label={
                          <span>
                            {" "}
                            Time Out<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        autoComplete="off"
                      />
                    </div>
                    {/* Time Out Field End */}

                    {/* Comments Field Start */}
                    <div className="col-12 col-md-8 mt-3">
                      <Field
                        name="comments"
                        component={TextArea}
                        placeholder=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={
                          <span>
                            {" "}
                            Comments<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.comments}
                        autoComplete="off"
                      />
                    </div>
                    {/* Comments Field End */}
                  </div>

                  <br />
                  <hr />
                  <Accordion defaultActiveKey="">
                    <Card>
                      <Card.Header>
                        <div className='accordion-header-btn'>
                          <Accordion.Toggle as={Button} eventKey="0">
                            Shift Details
                            <KeyboardArrowDown />
                          </Accordion.Toggle>
                        </div>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>

                          <div className="from-group row">
                            {/* Shift Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="shiftId"
                                component={Select}
                                className='form-control'
                                disabled
                                label={
                                  <span>
                                    {" "}
                                    Employee Shift
                                  </span>
                                }
                                value={values.shiftId}
                                autoComplete="off"
                                children={CustomDropdown({ data: allEmployeeShifts, firstElement: { label: '', value: null } })}
                              />
                            </div>
                            {/* Shift Field End */}

                            {/* inter Shift Gap Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="interShifGap"
                                component={Input}
                                className='form-control'
                                disabled
                                label={
                                  <span>
                                    {" "}
                                    inter Shift Gap
                                  </span>
                                }
                                autoComplete="off"
                              />
                            </div>
                            {/* inter Shift Gap Field End */}

                            {/* Shift Start Time Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="shiftStartTime"
                                component={Input}
                                className='form-control'
                                disabled
                                label={
                                  <span>
                                    {" "}
                                    Shift Start Time
                                  </span>
                                }
                                autoComplete="off"
                              />
                            </div>
                            {/* Shift Start Time Field End */}

                            {/* Shift End Time Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="shiftEndTime"
                                component={Input}
                                className='form-control'
                                disabled
                                label={
                                  <span>
                                    {" "}
                                    Shift End Time
                                  </span>
                                }
                                autoComplete="off"
                              />
                            </div>
                            {/* Shift End Time Field End */}

                            {/* Shift Hours Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="shiftWorkingHours"
                                component={Input}
                                className='form-control'
                                disabled
                                label={
                                  <span>
                                    {" "}
                                    Shift Hours
                                  </span>
                                }
                                autoComplete="off"
                              />
                            </div>
                            {/* Shift Hours Field End */}

                            {/* Late In Time Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="shiftLateIn"
                                component={Input}
                                disabled
                                className='form-control'
                                label={
                                  <span>
                                    {" "}
                                    Late In Time
                                  </span>
                                }
                                autoComplete="off"
                              />
                            </div>
                            {/* Late In Time Field End */}

                            {/* Early Out Time Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="shiftEarlyOut"
                                component={Input}
                                className='form-control'
                                disabled
                                label={
                                  <span>
                                    {" "}
                                    Early Out Time
                                  </span>
                                }
                                autoComplete="off"
                              />
                            </div>
                            {/* Early Out Time Field End */}

                            {/* Half day Start Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="shiftHalfDayStart"
                                component={Input}
                                className='form-control'
                                disabled
                                label={
                                  <span>
                                    {" "}
                                    Half day Start
                                  </span>
                                }
                                autoComplete="off"
                              />
                            </div>
                            {/* Half day Start Field End */}

                            {/* Half Day End Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="shiftHalfDayEnd"
                                component={Input}
                                className='form-control'
                                disabled
                                label={
                                  <span>
                                    {" "}
                                    Half Day End
                                  </span>
                                }
                                autoComplete="off"
                              />
                            </div>
                            {/* Half Day End Field End */}

                            {/* Allow OverTime Field Starts */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name={`isOverTime`}
                                component={Checkbox}
                                disabled
                                onChange={(e) => {
                                  setFieldValue(
                                    `isOverTime`,
                                    e.target.checked
                                  )
                                }}
                                isSelected={values.isOverTime}
                              />
                              <span>Allow OverTime</span>
                            </div>
                            {/* Allow OverTime Field End */}

                            {/* Include Inter-Shift Gap Field Starts */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name={`isIncludeInterShifGap`}
                                component={Checkbox}
                                onChange={(e) => {
                                  setFieldValue(
                                    `isIncludeInterShifGap`,
                                    e.target.checked
                                  )
                                }}
                                disabled
                                isSelected={values.isIncludeInterShifGap}
                              />
                              <span>Include Inter-Shift Gap</span>
                            </div>
                            {/* Include Inter-Shift Gap Field End */}

                            {/* Late By Hours Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="lateInHours"
                                component={Input}
                                className='form-control'
                                label={
                                  <span>
                                    {" "}
                                    Late By Hours
                                  </span>
                                }
                                disabled
                                autoComplete="off"
                              />
                            </div>
                            {/* Late By Hours Field End */}

                            {/* Overtime Start Time Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="overtimeStart"
                                component={Input}
                                className='form-control'
                                label={
                                  <span>
                                    {" "}
                                    Overtime Start Time
                                  </span>
                                }
                                disabled
                                autoComplete="off"
                              />
                            </div>
                            {/* Overtime Start Time Field End */}

                            {/* Overtime Hours Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="interShifGap"
                                component={Input}
                                className='form-control'
                                label={
                                  <span>
                                    {" "}
                                    Overtime Hours
                                  </span>
                                }
                                disabled
                                autoComplete="off"
                              />
                            </div>
                            {/* Overtime Hours Field End */}

                            {/* Actual Overtime Field Start */}
                            <div className="col-12 col-md-4 mt-3">
                              <Field
                                name="interShifGap"
                                component={Input}
                                className='form-control'
                                label={
                                  <span>
                                    {" "}
                                    Actual Overtime
                                  </span>
                                }
                                disabled
                                autoComplete="off"
                              />
                            </div>
                            {/* Actual Overtime Field End */}
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {!isUserForRead && (
                <button
                  type="button"
                  onClick={() => {
                    setfilters({ employeeId: '', attDateIn: '' })
                    handleReset()
                  }}
                  className="btn btn-light btn-elevate"
                >
                  Cancel
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
