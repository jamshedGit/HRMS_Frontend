import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";

import {
  fetchAllFormsMenu,
  fetchAllDeductionList,
  fetchAllEarningList,
  fetchAllSubsidiaryData

} from "../../../../../../_metronic/redux/dashboardActions";
import { useBanksUIContext } from "../BanksUIContext";
// // import { CheckBox } from "@material-ui/icons";
import axios from 'axios';
import { amountLimit } from "../../../../../utils/common";
import { DROPDOWN, VALIDATION_MESSAGES } from "../../../../../utils/constants";
export const USERS_URL = process.env.REACT_APP_API_URL;

const formValidation = Yup.object().shape({

  subsidiaryId: Yup.string()
    .nullable()
    .required("Required*"),
  gradeId: Yup.string()
    .nullable()
    .required("Required*"),
  employeeTypeId: Yup.string()
    .nullable()
    .required("Required*"),
  currencyId: Yup.string()
    .nullable()
    .required("Required*"),
  salaryMethod: Yup.string()
    .nullable()
    .required("Required*"),

  //   salaryMethod: Yup.string()
  //   .required('Required*') // Make it required
  // .notOneOf(['-1'], 'Please select a valid salary method'),

  basicFactor: Yup.string()
    .max(100, 'Value cannot be greater than 100')
    .when('salaryMethod', {
      is: "Gross to Basic", // if select value is 2
      then: Yup.string().required(VALIDATION_MESSAGES.required),
      otherwise: Yup.string().notRequired(),
    }),

  overtime_working_day: Yup.number()
    .max(100, 'Value cannot be greater than 100')
    .when('overtime_allowance', {
      is: (value) => value === true || value == 1,
      then: Yup.number().required(VALIDATION_MESSAGES.required),
      otherwise: Yup.number().notRequired(),
    }),
  overtime_off_day: Yup.number()
    .max(100, 'Value cannot be greater than 100')
    .when('overtime_allowance', {
      is: (value) => value === true || value == 1,
      then: Yup.number().required(VALIDATION_MESSAGES.required),
      otherwise: Yup.number().notRequired(),
    }),
  overtime_holiday: Yup.number()
    .max(100, 'Value cannot be greater than 100')
    .when('overtime_allowance', {
      is: (value) => value === true || value == 1,
      then: Yup.number().required(VALIDATION_MESSAGES.required),
      otherwise: Yup.number().notRequired(),
    })

},

);
export function BankEditForm({
  saveCompensationBenefits,
  user,
  actionsLoading,
  onHide,
  roles,
  centers,
  userStatusTypes,
  isUserForRead,
  values,
  enableLoading,
  loading,
  id
}) {
  const { dashboard } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [defEffectiveDate, setEffectiveDate] = useState(null);
  const [defEmployeeGrade = null, setDefualtEmployeeGrade] = useState(null);
  const [defCurrencyCodeList = null, setDefualtCurrencyCodeList] = useState(null);
  const [defchildEmptypeMenus = null, setDefaultChildEmpTypeMenus] = useState(null);
  const [defEarningList = null, setDefaultEarningList] = useState([]);
  const [defSubsidiary = null, setDefualtSubsidiaryList] = useState(null);
  const [deferrors, setErrors] = useState({});
  const [defAllowanceLimit, setDefaultAllowanceLimit] = useState('');

  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllSubsidiaryData("allSubsidiaryList"))
      dispatch(fetchAllFormsMenu(126, "allCurrencyCodeList")); // For All currecy Codes
      dispatch(fetchAllFormsMenu(143, "allEmployeeGradeList")); // For All Grade Codes
      dispatch(fetchAllFormsMenu(88, "allEmpTypeChildMenus")); // For EmployeeType
      // dispatch(fetchAllEarningList(1)); // For Earning
      // dispatch(fetchAllDeductionList(2)); // For deduction
      // dispatch(fetchAllFormsMenu(133, "allSubsidiaryList")); // For All Subsisidaries
    }
  }, [dispatch]);

  const fetchCompensationEarningDeductionList = async (compensationId) => {
    try {
      if (id != undefined) {
        const response = await axios.post(`${USERS_URL}/compensation/read-all-compensation-ed-heads`, { Id: compensationId || 0 });

        setDefaultEarningList(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  useEffect(() => {
    const emptypeId = defchildEmptypeMenus?.value ? defchildEmptypeMenus.value : user.employeeTypeId;
    setDefaultChildEmpTypeMenus(
      dashboard.allEmpTypeChildMenus &&
      dashboard.allEmpTypeChildMenus.filter((item) => {
        return item.value === emptypeId;
      })
    );

  }, [user?.employeeTypeId, dashboard.employeeTypeId]);
  //======================= End

  useEffect(() => {

    const subsidiaryId = defSubsidiary?.value ? defSubsidiary.value : user.subsidiaryId;
    dispatch(fetchAllEarningList(1, subsidiaryId)); // For Earning
    dispatch(fetchAllDeductionList(2, subsidiaryId)); // For deduction
    setDefualtSubsidiaryList(
      dashboard.allSubsidiaryList &&
      dashboard.allSubsidiaryList.filter((item) => {
        return item.value === subsidiaryId;
      })
    );

  }, [user?.subsidiaryId, dashboard.subsidiaryId]);

  useEffect(() => {
    const gradeId = defEmployeeGrade?.value ? defEmployeeGrade.value : user.gradeId;
    setDefualtEmployeeGrade(
      dashboard.allEmployeeGradeList &&
      dashboard.allEmployeeGradeList.filter((item) => {
        return item.value === gradeId;
      })
    );
    fetchCompensationEarningDeductionList(user.Id);
  }, [user?.gradeId, dashboard.gradeId]);

  useEffect(() => {
    const currencyId = defCurrencyCodeList?.value ? defCurrencyCodeList.value : user.currencyId;
    setDefualtCurrencyCodeList(
      dashboard.allCurrencyCodeList &&
      dashboard.allCurrencyCodeList.filter((item) => {
        return item.value === currencyId;
      })
    );


  }, [user?.currencyId, dashboard.currencyId]);

  const handleChanged = (e) => {
    const newValue = e.value;

    fetchCompensationEarningDeductionList(50);
  };

  //===== Date Of End Date
  useEffect(() => {

    if (user.effective_date) {
      setEffectiveDate(new Date(user.effective_date));
    }
  }, [user.effective_date]);

  //=========== END


  const addRow = (element) => {
    setDefaultEarningList([...defEarningList, { transactionType: element.target.id }])

  }

  const deleteRow = (element) => {
    const data = defEarningList;
    data.splice(element.target.id, 1);
    setDefaultEarningList([...data])
  }

  // Fetch record from database by ID

  const handleFieldChanged = (el) => {
    const index = el.target.id.split('-')[1]
    const key = el.target.id.split('-')[0]

    setDefaultEarningList([...defEarningList.map((val, ind) => {

      if (ind == index) {
        if (!(key == "factorValue" && Number(el.target.value) > 100)) {
          val[key] = key == 'calculation_type' ? (el.target.value) : Number(el.target.value)
        }
      }

      return val
    })])

  }

  const validate = () => {
    const newErrors = {};

    defEarningList.forEach((objValidate, index) => {

      if (!objValidate.earning_deduction_id) {
        newErrors[`earning_deduction_id-${index}`] = 'Required*';
      }
      if (!objValidate.calculation_type) {
        newErrors[`calculation_type-${index}`] = 'Required*';
      }
      // Check if factorValue is required
      if (!objValidate.factorValue && objValidate.amount <= 0) {
        newErrors[`factorValue-${index}`] = 'Required*';
      }

      // Check if amount is required
      if (!objValidate.amount && objValidate.factorValue <= 0) {
        newErrors[`amount-${index}`] = 'Required*';
      }
    });

    return newErrors;
  };

  const createDropdown = (data) => {
    return (data || []).map((el) => {
      return (<>
        <option value={el.value}>{el.label}</option>
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


          const validationErrors = validate();
          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
          } else {
            if (values.salaryMethod == "Gross to Basic") {
              let i = 0;
              i = Number(values.basicFactor || 0);
              defEarningList.forEach((element, index) => {

                if (element.factorValue > 0 && element.isPartOfGrossSalary == "1" && element.transactionType == "Earning") {
                  i += Number(element.factorValue || 0)
                }

              });
              if (i == 100) {
                setDefaultAllowanceLimit("")
                enableLoading();
                saveCompensationBenefits(values, defEarningList);
              }
              else {
                setDefaultAllowanceLimit("Allowance must be exactly 100%.")
              }
            }
            else if (values.salaryMethod == "Basic to Gross") {
              setDefaultAllowanceLimit("")
              enableLoading();
              saveCompensationBenefits(values, defEarningList);
            }
          }



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
                    {
                      <><div className="col-12 col-md-4 mt-3">
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
                            dispatch(fetchAllEarningList(1, e.value)); // For Earning
                            dispatch(fetchAllDeductionList(2, e.value));
                            setDefaultEarningList([])
                            //handlePaymenModeChanged(e)

                          }}

                          value={(defSubsidiary || null)}
                          error={errors.subsidiaryId}
                          touched={touched.subsidiaryId}
                          options={dashboard.allSubsidiaryList}
                        />
                        {/* <ErrorMessage className="form-feedBack" name="subsidiaryId" component="div" /> */}
                      </div></>

                    }
                    <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="gradeId"
                        label={<span> Grade<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("gradeId", e.value || null);
                          setDefualtEmployeeGrade(e);
                          // dispatch(fetchAllFormsMenu(e.value));
                        }}
                        value={(defEmployeeGrade || null)}
                        error={errors.gradeId}
                        touched={touched.gradeId}
                        options={dashboard.allEmployeeGradeList}
                      />

                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="employeeTypeId"
                        label={<span> Employee Type<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("employeeTypeId", e.value || null);
                          setDefaultChildEmpTypeMenus(e);
                          // dispatch(fetchAllFormsMenu(e.value));
                        }}
                        value={(defchildEmptypeMenus || null)}
                        error={errors.employeeTypeId}
                        touched={touched.employeeTypeId}
                        options={dashboard.allEmpTypeChildMenus}
                      />

                    </div>
                  </div>


                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <SearchSelect
                        name="currencyId"
                        label={<span> Currency<span style={{ color: 'red' }}>*</span></span>}
                        isDisabled={isUserForRead && true}
                        onBlur={() => {
                          // handleBlur({ target: { name: "countryId" } });
                        }}
                        onChange={(e) => {
                          setFieldValue("currencyId", e.value || null);
                          setDefualtCurrencyCodeList(e);
                          // dispatch(fetchAllFormsMenu(e.value));
                          handleChanged(e)
                        }}
                        value={(defCurrencyCodeList || null)}
                        error={errors.currencyId}
                        touched={touched.currencyId}
                        options={dashboard.allCurrencyCodeList}
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Select
                        label={<span> Salary Method<span style={{ color: 'red' }}>*</span></span>}
                        name="salaryMethod"
                        defaultValue="Gross to Basic"
                        value={values.salaryMethod}
                        onChange={e => {
                          setFieldValue("salaryMethod", e.target.value)
                          if (e.target.value == "Basic to Gross") {
                            setFieldValue("basicFactor", "")
                            setDefaultAllowanceLimit("")
                          }
                          setDefaultEarningList([])
                        }}
                        error={errors.salaryMethod}
                        touched={touched.salaryMethod}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
                        autoComplete="off">
                        <option value="-1" label="Select..." />
                        <option selected value="Gross to Basic" label="Gross to Basic" />
                        <option value="Basic to Gross" label="Basic to Gross" />

                      </Select>
                      {errors.salaryMethod && touched.salaryMethod && <ErrorMessage className="form-feedBack" name="salaryMethod" component="div" />}
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="basicFactor"
                        component={Input}
                        maxLength={2}
                        placeholder="Enter Basic Factor" disabled={values.salaryMethod == "Basic to Gross"}
                        label={<span> Basic Factor{Boolean(values.salaryMethod != "Basic to Gross") && <span style={{ color: 'red' }}>*</span>}</span>}
                        autoComplete="off"
                        error={errors.currencyId}
                        touched={touched.currencyId}
                      />
                      {/* <ErrorMessage className="form-feedBack" name="basicFactor" component="div" /> */}
                    </div>
                  </div>

                  <br>
                  </br>
                  <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                    <h6>Earnings</h6>
                    {/* {<a onClick={ModalUIProps.newButtonEarningTran} href='javascript:void(0)'>+ Add New </a>} */}
                    <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                      <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>
                        <td></td>
                        <td>Earning</td>
                        <td>Caculation Type</td>
                        <td>Factor</td>
                        <td>Amount</td>
                        <td>Part Of Gross Salary</td>
                      </tr>
                      {defEarningList?.map((obj, rightindex) => (
                        obj.transactionType == 'Earning' &&
                        <><tr>
                          <td id={rightindex} onClick={deleteRow}> Delete</td>
                          <td>
                            <select

                              onChange={(e) => {
                                handleFieldChanged(e);
                                setErrors((prev) => ({ ...prev, [`earning_deduction_id-${rightindex}`]: '' })); // Clear error on change

                              }}

                              id={'earning_deduction_id-' + rightindex} value={obj.earning_deduction_id}>
                              <option value="-1"> --Select--</option>
                              {
                                dashboard.allEarnings?.map((x) => {
                                  return <option disabled={defEarningList.find(el => el.earning_deduction_id == x.value) ? true : false} value={x.value}> {x.label} </option>
                                })}
                            </select>
                            {deferrors[`earning_deduction_id-${rightindex}`] && <div className="form-feedBack">{deferrors[`earning_deduction_id-${rightindex}`]}</div>}
                          </td>
                          {/* <td>
                            {obj.earningName}
                          </td> */}
                          <td>
                            <select

                              value={obj.calculation_type}
                              onChange={(e) => {
                                handleFieldChanged(e);
                                setErrors((prev) => ({ ...prev, [`calculation_type-${rightindex}`]: '' })); // Clear error on change
                                if (e.target.value == "Fixed Amount") { obj.factorValue = 0 }
                                else {
                                  obj.amount = 0
                                }
                              }}

                              id={'calculation_type-' + rightindex} >
                              {
                                createDropdown(DROPDOWN[values.salaryMethod] || [])
                              }
                            </select>
                            {deferrors[`calculation_type-${rightindex}`] && <div className="form-feedBack">{deferrors[`calculation_type-${rightindex}`]}</div>}
                          </td>
                          {/* <td>{obj.calculation_type}</td> */}
                          <td>
                            {<input
                              name='basicFactorEarn'
                              disabled={obj.calculation_type == "Fixed Amount"}
                              style={{ width: "80px" }} type="number"
                              onChange={(e) => {
                                handleFieldChanged(e);
                                setErrors((prev) => ({ ...prev, [`factorValue-${rightindex}`]: '' })); // Clear error on change
                              }}
                              value={obj.factorValue} id={'factorValue-' + rightindex}></input>}
                            {deferrors[`factorValue-${rightindex}`] && <div className="form-feedBack">{deferrors[`factorValue-${rightindex}`]}</div>}
                          </td>

                          <td>
                            <input
                              disabled={obj.calculation_type == "% Of Gross" || obj.calculation_type == "% Of Basic"}
                              style={{ width: "80px" }} type="number"
                              onChange={(e) => {
                                handleFieldChanged(e);
                                setErrors((prev) => ({ ...prev, [`amount-${rightindex}`]: '' })); // Clear error on change
                              }}
                              onInput={(e) => {
                                e.target.value = amountLimit(e.target.value); // Limit to 3 digits
                              }}
                              maxLength={8} value={obj.amount} id={'amount-' + rightindex}></input>
                            {deferrors[`amount-${rightindex}`] && <div className="form-feedBack">{deferrors[`amount-${rightindex}`]}</div>}
                          </td>
                          <td>
                            <select value={obj.isPartOfGrossSalary} onChange={handleFieldChanged} id={'isPartOfGrossSalary-' + rightindex} >

                              <option selected value="-1">Select</option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
                          </td>
                        </tr>
                        </>
                      ))}

                    </table>
                    <input type='button' id="Earning" onClick={addRow} value='+Add'></input>
                    &nbsp;&nbsp;<span className="form-feedBack" id="msgLimitAllowance">{defAllowanceLimit}</span>
                  </div>
                  <br></br>
                  <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                    <h6>Deductions</h6>
                    {/* {<a onClick={ModalUIProps.newButtonDeductionTran} href='javascript:void(0)'>+ Add New </a>} */}
                    <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                      <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>
                        {/* <td>Employee</td> */}
                        <td></td>
                        <td>Deduction</td>
                        <td>Calculation Type</td>
                        <td>Factor</td>
                        <td>Amount</td>
                        {/* <td>Part Of Gross Salary</td> */}
                      </tr>
                      {defEarningList?.map((obj, rightindex) => (
                        obj.transactionType == 'Deduction' &&
                        <><tr>


                          <td id={rightindex} onClick={deleteRow}> Delete</td>

                          <td>  <select style={{ width: "200px" }} onChange={handleFieldChanged} id={'earning_deduction_id-' + rightindex} value={obj.earning_deduction_id}>
                            <option value="-1"> --Select--</option>
                            {
                              dashboard.allDeductions?.map((x) => {
                                return <option disabled={defEarningList.find(el => el.earning_deduction_id == x.value) ? true : false} value={x.value}> {x.label} </option>
                              })}


                          </select>
                            {deferrors[`earning_deduction_id-${rightindex}`] && <div className="form-feedBack">{deferrors[`earning_deduction_id-${rightindex}`]}</div>}
                          </td>

                          <td>
                            <select
                              value={obj.calculation_type}
                              onChange={(e) => {
                                handleFieldChanged(e);
                                setErrors((prev) => ({ ...prev, [`calculation_type-${rightindex}`]: '' })); // Clear error on change

                                if (e.target.value == "Fixed Amount") { obj.factorValue = 0 }
                                else {
                                  obj.amount = 0
                                }

                              }}
                              id={'calculation_type-' + rightindex} >
                              {
                                createDropdown(DROPDOWN[values.salaryMethod] || [])
                              }
                            </select>
                            {deferrors[`calculation_type-${rightindex}`] && <div className="form-feedBack">{deferrors[`calculation_type-${rightindex}`]}</div>}
                          </td>

                          <td>
                            <input

                              style={{ width: "80px" }}
                              type="number"
                              onChange={handleFieldChanged}
                              disabled={obj.calculation_type == "Fixed Amount"}
                              value={obj.factorValue} id={'factorValue-' + rightindex}>
                            </input>
                            {deferrors[`factorValue-${rightindex}`] && <div className="form-feedBack">{deferrors[`factorValue-${rightindex}`]}</div>}
                          </td>
                          <td><input maxLength={8}
                            type="number"
                            onInput={(e) => {
                              e.target.value = amountLimit(e.target.value); // Limit to 3 digits
                            }}
                            disabled={obj.calculation_type == "% Of Gross" || obj.calculation_type == "% Of Basic"} style={{ width: "80px" }}
                            onChange={handleFieldChanged} value={obj.amount} id={'amount-' + rightindex}></input>
                          </td>
                          {deferrors[`amount-${rightindex}`] && <div className="form-feedBack">{deferrors[`amount-${rightindex}`]}</div>}
                        </tr>
                        </>
                      ))}

                    </table>
                    <input type='button' id="Deduction" onClick={addRow} value='+Add'></input>
                  </div>

                  <br>
                  </br>
                  <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                    <h6>Earning Entitlements</h6>

                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <input type="checkbox"
                          name="gratuity_member"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.gratuity_member}
                          checked={values.gratuity_member}

                        /> Gratuity Member
                      </div>
                    </div>

                    <div className="from-group row">
                      <div className="col-12 col-md-3 mt-3">
                        <input
                          name="overtime_allowance"
                          type="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.overtime_allowance}
                          checked={values.overtime_allowance}
                        /> Over Time

                      </div>
                    </div>
                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="overtime_working_day"
                          disabled={!Boolean(values.overtime_allowance)}
                          type="number"
                          component={Input}
                          maxLength={2}
                          label={<span>Overtime Factor Working Day{Boolean(values.overtime_allowance) && <span style={{ color: 'red' }}>*</span>}</span>}
                          autoComplete="off"
                          value={!Boolean(values.overtime_allowance) ? '' : values.overtime_working_day}
                        />
                      </div>

                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="overtime_off_day"
                          disabled={!Boolean(values.overtime_allowance)}
                          type="number"
                          component={Input}
                          maxLength={2}
                          label={<span>Overtime Factor Off day{Boolean(values.overtime_allowance) && <span style={{ color: 'red' }}>*</span>}</span>}
                          autoComplete="off"
                          value={!Boolean(values.overtime_allowance) ? '' : values.overtime_off_day}
                        />
                      </div>

                      <div className="col-12 col-md-4 mt-3">
                        <Field
                          name="overtime_holiday"
                          disabled={!Boolean(values.overtime_allowance)}
                          type="number"
                          component={Input}
                          maxLength={2}
                          label={<span>Overtime Factor Holiday{Boolean(values.overtime_allowance) && <span style={{ color: 'red' }}>*</span>}</span>}
                          autoComplete="off"
                          value={!Boolean(values.overtime_allowance) ? '' : values.overtime_holiday}
                        />
                      </div>
                      {/* <div className="col-12 col-md-4 mt-3">
                        <input
                          type="checkbox"
                          name="shift_allowance"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.shift_allowance}
                          checked={values.shift_allowance}
                        />  Shift Allowance

                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <input
                          type="checkbox"
                          name="regularity_allowance"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.regularity_allowance}
                          checked={values.regularity_allowance}
                        /> Regularity Allowance
                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <input
                          type="checkbox"
                          name="punctuality_allowance"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.punctuality_allowance}
                          value={values.punctuality_allowance}
                        /> Punctuality Allowance

                      </div> */}
                    </div>
                  </div>
                  <br></br>
                  <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                    <h6>Deduction Entitlements</h6>


                    <div className="from-group row">
                      {/* <div className="col-12 col-md-4 mt-3">
                        <input
                          name="pf_member"
                          type="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.pf_member}
                          value={values.pf_member}
                        //onChange={handleCheckboxChange}
                        /> PF Member

                      </div> */}
                      <div className="col-12 col-md-4 mt-3">
                        <input
                          name="eobi_member"
                          type="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.eobi_member}
                          checked={values.eobi_member}
                        /> EOBI Member

                      </div>
                      <div className="col-12 col-md-4 mt-3">
                        <input
                          type="checkbox"
                          name="social_security_member"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.social_security_member}
                          checked={values.social_security_member}
                        /> Social Security Member

                      </div>
                      {/* <div className="col-12 col-md-4 mt-3">
                        <input
                          type="checkbox"

                          name="pension_member"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pension_member}
                          checked={values.pension_member}
                        /> Pension Member
                      </div> */}

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
