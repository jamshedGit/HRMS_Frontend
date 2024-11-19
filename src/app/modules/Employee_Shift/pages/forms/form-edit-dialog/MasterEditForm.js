import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DatePickerField, Input, Select } from "../../../../../../_metronic/_partials/controls";
import CustomErrorLabel from "../../../../../utils/common-modules/CustomErrorLabel";
import { getClassName } from "../../../../../utils/common";
import { VALIDATION_MESSAGES } from "../../../../../utils/constants";
import { fetchAllFormsMenu, fetchAllLeaveType, fetchAllSubsidiaryData } from "../../../../../../_metronic/redux/dashboardActions";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
//Validation for Form
const formValidation = Yup.object().shape({
  subsidiaryId: Yup.number().required(VALIDATION_MESSAGES.required),
  shiftType: Yup.number().required(VALIDATION_MESSAGES.required),
  name: Yup.string().required(VALIDATION_MESSAGES.required),
  shiftCode: Yup.string().required(VALIDATION_MESSAGES.required),
  startTime: Yup.string()
    .required('Start Time is required')
    .matches(/^\d{4}$/, 'Start Time must be in HHmm format'), // Ensuring HHmm format
 
    workingdays: Yup.array()
    .min(1, 'At least one working day must be selected')
    .required('Working days are required'),
    
  endTime: Yup.string()
    .required('Required*')
    .matches(/^\d{4}$/, 'End Time must be in HHmm format') // Ensuring HHmm format
    .when('startTime', {
      // Check that endTime is greater than or equal to startTime
      is: (startTime) => startTime && startTime !== '',
      then: Yup.string().test('end-time-validation', 'End Time cannot be less than Start Time', function (endTime) {
        const { startTime } = this.parent; // Access startTime from parent values
        if (startTime && endTime && startTime > endTime) {
          return false; // Validation fails if endTime is less than startTime
        }
        return true;
      })
    }),

  earlyIn: Yup.string()
    .required('Early In Time is required')
    .matches(/^\d{4}$/, 'Early In Time must be in HHmm format'),

  earlyOut: Yup.string()
    .required('Early Out Time is required')
    .matches(/^\d{4}$/, 'Early Out Time must be in HHmm format')
    .when('earlyIn', {
      is: (earlyIn) => earlyIn && earlyIn !== '',
      then: Yup.string().test('early-out-validation', 'Early Out Time cannot be less than Early In Time', function (earlyOut) {
        const { earlyIn } = this.parent;
        if (earlyIn && earlyOut && earlyIn > earlyOut) {
          return false; // Validation fails if earlyOut is less than earlyIn
        }
        return true;
      })
    }),

  halfDayStart: Yup.string()
    .required('Half Day Start is required')
    .matches(/^\d{4}$/, 'Half Day Start must be in HHmm format'),

  halfDayEnd: Yup.string()
    .required('Half Day End is required')
    .matches(/^\d{4}$/, 'Half Day End must be in HHmm format')
    .when('halfDayStart', {
      is: (halfDayStart) => halfDayStart && halfDayStart !== '',
      then: Yup.string().test('half-day-end-validation', 'Half Day End cannot be less than Half Day Start', function (halfDayEnd) {
        const { halfDayStart } = this.parent; // Access halfDayStart from parent values
        if (halfDayStart && halfDayEnd && halfDayStart > halfDayEnd) {
          return false; // Validation fails if halfDayEnd is less than halfDayStart
        }
        return true;
      })
    }),
  breakTimeStart: Yup.string()
    .required('Break Time Start is required')
    .matches(/^\d{4}$/, 'Break Time Start must be in HHmm format'),

  breakTimeEnd: Yup.string()
    .required('Break Time End is required')
    .matches(/^\d{4}$/, 'Break Time End must be in HHmm format')
    .when('breakTimeStart', {
      is: (breakTimeStart) => breakTimeStart && breakTimeStart !== '',
      then: Yup.string().test('break-time-end-validation', 'Break Time End cannot be less than Break Time Start', function (breakTimeEnd) {
        const { breakTimeStart } = this.parent; // Access breakTimeStart from parent values
        if (breakTimeStart && breakTimeEnd && breakTimeStart > breakTimeEnd) {
          return false; // Validation fails if breakTimeEnd is less than breakTimeStart
        }
        return true;
      })
    })

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


  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state);
  const [defSubsidiary = null, setDefualtSubsidiaryList] = useState(null);
  const [defLeaveType = null, setDefualtLeaveType] = useState(null);
  const [defWeekDays, setDefaultWeekDays] = useState([]); //  For Email Recipents
  const [defShiftType = null, setShiftTypeCodeList] = useState(null);

  const WeekDays = Object.freeze({
    SUNDAY: 'Sunday',
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
  });


  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllLeaveType("allLeaveTypes"))
      // dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsisidaries
      dispatch(fetchAllSubsidiaryData("allSubsidiaryList"));
      dispatch(fetchAllFormsMenu(219, "allShiftTypeList"));
    }
  }, [dispatch]);


  useEffect(() => {

    const subsidiaryId = defSubsidiary?.value ? defSubsidiary.value : user.subsidiaryId;
    if (subsidiaryId) {
      setDefaultWeekDays(user?.workingdays?.split(",") || []);
    }
    setDefualtSubsidiaryList(
      dashboard.allSubsidiaryList &&
      dashboard.allSubsidiaryList.filter((item) => {
        return item.value === subsidiaryId;
      })
    );

  }, [user?.subsidiaryId, dashboard.subsidiaryId]);



  useEffect(() => {


    const shiftType = defShiftType?.value ? defShiftType.value : user.shiftType;

    setShiftTypeCodeList(
      dashboard.allShiftTypeList &&
      dashboard.allShiftTypeList.filter((item) => {
        return item.value == shiftType;
      })
    );

  }, [user?.shiftType, dashboard.shiftType]);

  // useEffect(() => {

  //   const leaveTypeId = defLeaveType?.value ? defLeaveType.value : user.leave_typeId;

  //   setDefualtLeaveType(
  //     dashboard.allLeaveTypes &&
  //     dashboard.allLeaveTypes.filter((item) => {
  //       return item.value === leaveTypeId;
  //     })
  //   );

  // }, [user?.leave_typeId, dashboard.leave_typeId]);


  const handleCheckboxChangeFor_WeekDays = (option,setFieldValue, values) => {

    setDefaultWeekDays((prevState) =>

      prevState.includes(option)
        ? prevState.filter(item => item !== option)
        : [...prevState, option]
    );

     // Update Formik state (workingdays)
  const newWorkingDays = values.workingdays.includes(option)
  ? values.workingdays.filter((day) => day !== option)
  : [...values.workingdays, option];

setFieldValue('workingdays', newWorkingDays); // Update the Formik form state

  };

    // Handle checkbox changes (adding/removing days from the selected list)
    const handleCheckboxChange = (day, setFieldValue, values) => {
      const newWorkingDays = values.workingdays.includes(day)
        ? values.workingdays.filter((selectedDay) => selectedDay !== day)
        : [...values.workingdays, day];
      setFieldValue('workingdays', newWorkingDays);
    };


  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={formValidation}
        onSubmit={(values) => {
          const listOfValues = { ...values, workingdays: defWeekDays.join(',') }

          
          enableLoading();
          submitForm(listOfValues)
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
                      <SearchSelect
                        name="subsidiaryId"
                        label={<span> Subsidiary<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {

                          setFieldValue("subsidiaryId", e.value || null);
                          setDefualtSubsidiaryList(e);

                          //handlePaymenModeChanged(e)
                        }}
                        error={errors.subsidiaryId}
                        value={(defSubsidiary || null)}
                        options={dashboard?.allSubsidiaryList}
                      />
                      <ErrorMessage className="form-feedBack" name="subsidiaryId" component="div" />


                    </div>
                  </div>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="shiftType"
                        label={<span> Shift Type<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("shiftType", e.value);
                          setShiftTypeCodeList(e);

                        }}
                        value={defShiftType}
                        error={errors.shiftType}

                        options={dashboard.allShiftTypeList}

                      />
                      <ErrorMessage className="form-feedBack" name="shiftType" component="div" />
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="name"
                        component={Input}
                        placeholder="Enter shift name"
                        maxLength={30}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={
                          <span>
                            {" "}
                            Shift Name<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.name}
                        autoComplete="off"
                      />
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="shiftCode"
                        component={Input}
                        placeholder="Enter shift code"
                        maxLength={6}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={
                          <span>
                            {" "}
                            Shift Code<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.shiftCode}
                        autoComplete="off"
                      />
                    </div>



                    {/* <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="leave_typeId"
                        label={<span> Leave Type<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("leave_typeId", e.value || null);
                          setDefualtLeaveType(e);
                          //handlePaymenModeChanged(e)
                        }}
                        value={(defLeaveType || null)}
                        options={dashboard?.allLeaveTypes}
                      />
                      <ErrorMessage className="form-feedBack" name="leave_typeId" component="div" />
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="late_count_leave_deduction"
                        component={Input}
                        placeholder=""
                        maxLength={2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={
                          <span>
                            {" "}
                            Late Count (Per Leave)<span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        value={values.late_count_leave_deduction}
                        autoComplete="off"
                      />
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                        <input
                          name="isEnable_att_integration"
                          type="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.isEnable_att_integration}
                          checked={values.isEnable_att_integration}
                          label="Enable Employee Shift"
                        />
                        <label>&nbsp;<span>Enable Employee Shift</span></label>
                      </div> */}

                  </div>
                  <div className="from-group row">

                    <div className="col-12 col-md-4 mt-3">
                      <label>
                        Start Time <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        name="startTime"
                        component={DatePickerField}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm aa"
                        timeIntervals={15} // Optional: set interval for time selection (e.g., every 15 minutes)
                        dateFormat="HHmm"
                        placeholder="Select Time"
                        type="time"
                        minDate={values.startTime}
                        onChange={(e) => {
                          const formattedTime = e ? e.toISOString().slice(11, 16).replace(":", "") : '';
                          setFieldValue('startTime', formattedTime);
                        }}
                      />
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <label>
                        End Time <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        name="endTime"
                        component={DatePickerField}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm"
                        timeIntervals={15} // Optional: set interval for time selection (e.g., every 15 minutes)
                        dateFormat="HHmm"
                        placeholder="Select Time"
                        type="time"
                        minDate={values.endTime}
                        onChange={(e) => {
                          const formattedTime = e ? e.toISOString().slice(11, 16).replace(":", "") : '';
                          setFieldValue('endTime', formattedTime);
                        }}

                      />
                    </div>



                  </div>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <label>
                        Early Time (In) <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        name="earlyIn"
                        component={DatePickerField}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm aa"
                        timeIntervals={15} // Optional: set interval for time selection (e.g., every 15 minutes)
                        dateFormat="HHmm"
                        placeholder="Select Time"
                        type="time"
                        minDate={values.earlyIn}
                        value={values.earlyIn}
                        error={errors.earlyIn}
                        autoComplete="off"
                        onChange={(e) => {
                          const formattedTime = e ? e.toISOString().slice(11, 16).replace(":", "") : '';
                          setFieldValue('earlyIn', formattedTime);
                        }}

                      />
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <label>
                        Early Time (Out) <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        name="earlyOut"
                        component={DatePickerField}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm aa"
                        timeIntervals={15} // Optional: set interval for time selection (e.g., every 15 minutes)
                        dateFormat="HHmm"
                        placeholder="Select Time"
                        type="time"
                        minDate={values.earlyOut}
                        value={values.earlyOut}
                        error={errors.earlyOut}
                        autoComplete="off"
                        onChange={(e) => {
                          const formattedTime = e ? e.toISOString().slice(11, 16).replace(":", "") : '';
                          setFieldValue('earlyOut', formattedTime);
                        }}

                      />
                    </div>

                  </div>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <label>
                        Half Day Start <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        name="halfDayStart"
                        component={DatePickerField}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm aa"
                        timeIntervals={15} // Optional: set interval for time selection (e.g., every 15 minutes)
                        dateFormat="HHmm"
                        placeholder="Select Time"
                        type="time"
                        minDate={values.halfDayStart}
                        value={values.halfDayStart}
                        error={errors.halfDayStart}
                        autoComplete="off"
                        onChange={(e) => {
                          const formattedTime = e ? e.toISOString().slice(11, 16).replace(":", "") : '';
                          setFieldValue('halfDayStart', formattedTime);
                        }}
                      />
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <label>
                        Early Time (Out) <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        name="halfDayEnd"
                        component={DatePickerField}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm aa"
                        timeIntervals={15} // Optional: set interval for time selection (e.g., every 15 minutes)
                        dateFormat="HHmm"
                        placeholder="Select Time"
                        type="time"
                        minDate={values.halfDayEnd}
                        value={values.halfDayEnd}
                        error={errors.halfDayEnd}
                        autoComplete="off"
                        onChange={(e) => {
                          const formattedTime = e ? e.toISOString().slice(11, 16).replace(":", "") : '';
                          setFieldValue('halfDayEnd', formattedTime);
                        }}
                      />
                    </div>

                  </div>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <label>
                        Break Time Start <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        name="breakTimeStart"
                        component={DatePickerField}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm aa"
                        timeIntervals={15} // Optional: set interval for time selection (e.g., every 15 minutes)
                        dateFormat="HHmm"
                        placeholder="Select Time"
                        type="time"
                        minDate={values.breakTimeStart}
                        value={values.breakTimeStart}
                        error={errors.breakTimeStart}
                        autoComplete="off"
                        onChange={(e) => {
                          const formattedTime = e ? e.toISOString().slice(11, 16).replace(":", "") : '';
                          setFieldValue('breakTimeStart', formattedTime);
                        }}
                      />
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <label>
                        Break Time End <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        name="breakTimeEnd"
                        component={DatePickerField}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm aa"
                        timeIntervals={15} // Optional: set interval for time selection (e.g., every 15 minutes)
                        dateFormat="HHmm"
                        placeholder="Select Time"
                        type="time"
                        minDate={values.breakTimeEnd}
                        value={values.breakTimeEnd}
                        error={errors.breakTimeEnd}
                        autoComplete="off"
                        onChange={(e) => {
                          const formattedTime = e ? e.toISOString().slice(11, 16).replace(":", "") : '';
                          setFieldValue('breakTimeEnd', formattedTime);
                        }}
                      />
                    </div>

                  </div>
                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      Working Days
                      <div style={{ backgroundColor: "#ffffff", height: "170px", padding: "10px", overflow: "scroll" }}>

                        <div className="multi-select">

                          <div className="dropdown-label"></div>
                          <div className="dropdown-options" style={{ fontSize: "12px", fontWeight: "bold", padding: "5px" }}>
                            {Object.values(WeekDays).map((day) => (
                              <div key={day} className="dropdown-option">
                                <input style={{ width: "25px" }}
                                  name="workingdays"
                                  type="checkbox"
                                  checked={defWeekDays?.includes(day)}
                                  onChange={
                                    () => {
                                      handleCheckboxChangeFor_WeekDays(day, setFieldValue, values)

                                      //setDefaultWeekDays(day)

                                    }

                                  }
                                />
                                {day}
                              </div>
                            ))}

                          </div>
                        
                        </div>
                     
                      </div>
                      <ErrorMessage className="form-feedBack" name="workingdays" component="div" />
                    </div>
                  </div>
                  <hr></hr>
                  <label>
                    <h3>Over Time</h3>
                  </label>

                  <div className="from-group row">

                    <div className="col-12 col-md-4 mt-12">
                      <input
                        name="isOverTime"
                        type="checkbox"
                        onChange={(e) => {
                          // Update the checkbox value using Formik's handleChange
                          handleChange(e);
                          const { checked } = e.target;

                          // If unchecked, clear the overTimeStart field
                          if (!checked) {
                            setFieldValue("overTimeStart", ""); // Clear the time field when Overtime is disabled
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.isOverTime}
                        checked={values.isOverTime}
                        label="IsOverTime"

                      />
                      <label>&nbsp;<span>Enable OverTime</span></label>
                    </div>

                    <div className="col-12 col-md-4 mt-3">
                      <label>
                        Over Time Start
                      </label>
                      <Field
                        name="overTimeStart"
                        component={DatePickerField}
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="HH:mm aa"
                        timeIntervals={15} // Optional: set interval for time selection (e.g., every 15 minutes)
                        dateFormat="HHmm"
                        placeholder="Select Time"
                        type="time"
                        minDate={values.overTimeStart}
                        value={values.overTimeStart}
                        error={errors.overTimeStart}
                        disabled={!values.isOverTime}
                        onChange={(e) => {
                          const formattedTime = e ? e.toISOString().slice(11, 16).replace(":", "") : '';
                          setFieldValue('overTimeStart', formattedTime);
                        }}
                      />
                    </div>

                  </div>
                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-12">
                      <input
                        name="isIncludeInterShifGap"
                        type="checkbox"
                        onChange={(e) => {
                          // Update the checkbox value using Formik's handleChange
                          handleChange(e);
                          const { checked } = e.target;

                          // If unchecked, clear the overTimeStart field
                          if (!checked) {
                            setFieldValue("interShiftGap", ""); // Clear the time field when Overtime is disabled
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.isIncludeInterShifGap}
                        checked={values.isIncludeInterShifGap}
                        label="IsInclude Intershift Gap"

                      />
                      <label>&nbsp;<span>IsInclude InterShift Gap</span></label>
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="interShiftGap"
                        component={Input}
                        placeholder="Enter shift gap time"
                        maxLength={6}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={
                          <span>
                            {" "}
                            InterShift Gap Time
                          </span>
                        }
                        value={values.interShiftGap}
                        autoComplete="off"
                        disabled={!values.isIncludeInterShifGap}
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
