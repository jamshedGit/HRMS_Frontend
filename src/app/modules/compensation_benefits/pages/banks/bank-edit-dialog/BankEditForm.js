import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select, TextArea, Checkbox } from "../../../../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import { toast } from "react-toastify";

import {
  fetchAllCity,
  fetchAllCountry,
  fetchAllFormsMenu,
  fetchAllActiveEmployees,
  fetchAllEarningDeductionList,
  fetchAllEarningHeads,
  fetchAllDeductionList,
  fetchAllEarningList

} from "../../../../../../_metronic/redux/dashboardActions";
import DatePicker from "react-datepicker";
import { useBanksUIContext } from "../BanksUIContext";
// // import { CheckBox } from "@material-ui/icons";
import axios from 'axios';
export const USERS_URL = process.env.REACT_APP_API_URL;

// Phone Number Regex
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
// CNIC Regex
const cnicRegExp = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
// Password Regex
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Validation schema
const formValidation = Yup.object().shape(
  {

    subsidiaryId: Yup.string()
      .required("Required*"),
    gradeId: Yup.string()
      .required("Required*"),
    employeeTypeId: Yup.string()
      .required("Required*"),
    currencyId: Yup.string()
      .required("Required*"),

    // basicFactorEarn: Yup.number()
    //   .max(100, 'Value cannot be greater than 100')
    //   .required('basic Factor is required')

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
  const BanksUIContext = useBanksUIContext()
  const ModalUIProps = useMemo(() => {
    return {
      newButtonEarningTran: BanksUIContext.newButtonEarningTran,
      newButtonDeductionTran: BanksUIContext.newButtonDeductionTran,
    }
  }, [BanksUIContext])
  const dispatch = useDispatch();
  const [defEffectiveDate, setEffectiveDate] = useState(null);

  const [defEmployeeGrade = null, setDefualtEmployeeGrade] = useState(null);
  const [defCurrencyCodeList = null, setDefualtCurrencyCodeList] = useState(null);
  const [defchildEmptypeMenus = null, setDefaultChildEmpTypeMenus] = useState(null);

  const [defEarningList = null, setDefaultEarningList] = useState([]);
  const [defDeductionList = null, setDefaultDeductionList] = useState([]);
  const [defSubsidiary = null, setDefualtSubsidiaryList] = useState(null);

  useEffect(() => {
    if (!user.Id) {
      dispatch(fetchAllFormsMenu(126, "allCurrencyCodeList")); // For All currecy Codes
      dispatch(fetchAllFormsMenu(143, "allEmployeeGradeList")); // For All Grade Codes
      dispatch(fetchAllFormsMenu(88, "allEmpTypeChildMenus")); // For EmployeeType
      dispatch(fetchAllEarningList(1)); // For Earning
      dispatch(fetchAllDeductionList(2)); // For deduction
      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsisidaries
    }
  }, [dispatch]);

  const fetchCompensationEarningDeductionList = async (compensationId) => {
    try {
      if (id != undefined) {
        console.log("dell", compensationId, user.Id);
        const response = await axios.post(`${USERS_URL}/compensation/read-all-compensation-ed-heads`, { Id: compensationId || 0 });
        console.log("compensation resp", response);
        setDefaultEarningList(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // useEffect(() => {


  //   const fetchEarning_CompensationList = async () => {
  //     try {
  //       if (id != undefined) {
  //         console.log('test contact', id)
  //         const response = await axios.post(`${USERS_URL}/compensation/read-all-earning-deduction`, { Id: id, transactionType: 'Earning' });
  //         console.log("tall resp", response);
  //         setDefaultEarningList(response?.data?.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }


  //   const fetchEDeduction_CompensationList = async () => {
  //     try {
  //       if (id != undefined) {
  //         console.log('test contact', id)
  //         const response = await axios.post(`${USERS_URL}/compensation/read-all-earning-deduction`, { Id: id, transactionType: 'Deduction' });
  //         console.log("tall resp", response);
  //         setDefaultDeductionList(response?.data?.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }

  //   // fetchEDeduction_CompensationList();
  //   //  fetchEarning_CompensationList();

  // }, []);

  //======================= Employee Type

  useEffect(() => {
    const emptypeId = defchildEmptypeMenus?.value ? defchildEmptypeMenus.value : user.employeeTypeId || 148;
    setDefaultChildEmpTypeMenus(
      dashboard.allEmpTypeChildMenus &&
      dashboard.allEmpTypeChildMenus.filter((item) => {
        return item.value === emptypeId;
      })
    );

  }, [user?.employeeTypeId, dashboard.employeeTypeId]);
  //======================= End

  console.log("dashboard.allSubidiaryList", dashboard.allSubidiaryList)
  useEffect(() => {

    const subsidiaryId = defSubsidiary?.value ? defSubsidiary.value : user.subsidiaryId || 134;
    console.log("subsidiaryId123", user);

    setDefualtSubsidiaryList(
      dashboard.allSubidiaryList &&
      dashboard.allSubidiaryList.filter((item) => {
        return item.value === subsidiaryId;
      })
    );

  }, [user?.subsidiaryId, dashboard.subsidiaryId]);

  useEffect(() => {
    const gradeId = defEmployeeGrade?.value ? defEmployeeGrade.value : user.gradeId || 144;
    setDefualtEmployeeGrade(
      dashboard.allEmployeeGradeList &&
      dashboard.allEmployeeGradeList.filter((item) => {
        return item.value === gradeId;
      })
    );
    fetchCompensationEarningDeductionList(user.Id);
  }, [user?.gradeId, dashboard.gradeId]);

  useEffect(() => {
    const currencyId = defCurrencyCodeList?.value ? defCurrencyCodeList.value : user.currencyId || 130;
    setDefualtCurrencyCodeList(
      dashboard.allCurrencyCodeList &&
      dashboard.allCurrencyCodeList.filter((item) => {
        return item.value === currencyId;
      })
    );


  }, [user?.currencyId, dashboard.currencyId]);

  const handleChanged = (e) => {
    const newValue = e.value;
    console.log('Selected value:', newValue);
    fetchCompensationEarningDeductionList(50);
  };

  //===== Date Of End Date
  useEffect(() => {

    if (user.effective_date) {
      setEffectiveDate(new Date(user.effective_date));
    }
  }, [user.effective_date]);

  //=========== END
  console.log("dashboar111", dashboard, user)

  const addRow = (element) => {
    setDefaultEarningList([...defEarningList, { transactionType: element.target.id }])
    console.log("defEarningList", defEarningList)
  }

  // const addRowDeduction = (element) => {
  //   setDefaultDeductionList([...defDeductionList, { transactionType: element.target.id }])
  // }

  const deleteRow = (element) => {
    const data = defEarningList;
    data.splice(element.target.id, 1);
    setDefaultEarningList([...data])
  }

  // Fetch record from database by ID

  const handleFieldChanged = (el) => {
    const index = el.target.id.split('-')[1]
    const key = el.target.id.split('-')[0]
    console.log("key1", key);
    setDefaultEarningList([...defEarningList.map((val, ind) => {

      if (ind == index) {
        if (!(key == "factorValue" && Number(el.target.value) > 100)) {
          val[key] = key == 'calculation_type' ? (el.target.value) : Number(el.target.value)
        }
      }

      return val
    })])

  }

  function toastMessage(message, type) {

    if (type == "error") {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (type == "success") {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }


  console.log("user control", user)
  
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user.subsidiaryId ? user : {  subsidiaryId: 134, gradeId: 144, currencyId: 130 }}
        validationSchema={formValidation}
        onSubmit={(values) => {
          console.log("values", values);
          enableLoading();
          saveCompensationBenefits(values, defEarningList);

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
                            //handlePaymenModeChanged(e)

                          }}
                          
                          value={(defSubsidiary || null)}
                          error={errors.subsidiaryId}
                          touched={touched.subsidiaryId}
                          options={dashboard.allSubidiaryList}
                        />

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
                        error={errors.Id}
                        touched={touched.Id}
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
                        label="Salary Method"
                        name="salaryMethod"
                        defaultValue="Gross to Basic"
                        value={values.salaryMethod}
                        onChange={e => {
                          setFieldValue("salaryMethod", e.target.value)
                          if (e.target.value == "Basic to Gross") {
                            setFieldValue("basicFactor", "")
                          }
                        }}

                        onBlur={handleBlur}
                        style={{ display: "block" }}
                        autoComplete="off">
                        <option value="-1" label="Select..." />
                        <option selected value="Gross to Basic" label="Gross to Basic" />
                        <option value="Basic to Gross" label="Basic to Gross" />

                      </Select>
                    </div>
                    <div className="col-12 col-md-4 mt-3">
                      <Field
                        name="basicFactor"
                        component={Input}

                        placeholder="Enter Basic Factor" disabled={values.salaryMethod == "Basic to Gross"}
                        label={<span> Basic Factor<span style={{ color: 'red' }}>*</span></span>}
                        autoComplete="off"
                      />
                    </div>
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
                      <div className="col-12 col-md-4 mt-3">
                        <input
                          name="overtime_allowance"
                          type="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.overtime_allowance}
                          checked={values.overtime_allowance}
                        /> Over Time

                      </div>
                      <div className="col-12 col-md-4 mt-3">
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

                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div style={{ backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                    <h6>Deduction Entitlements</h6>


                    <div className="from-group row">
                      <div className="col-12 col-md-4 mt-3">
                        <input
                          name="pf_member"
                          type="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.pf_member}
                          value={values.pf_member}
                        //onChange={handleCheckboxChange}
                        /> PF Member

                      </div>
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
                      <div className="col-12 col-md-4 mt-3">
                        <input
                          type="checkbox"

                          name="pension_member"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pension_member}
                          checked={values.pension_member}
                        /> Pension Member
                      </div>

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
                            <select onChange={handleFieldChanged} id={'earning_deduction_id-' + rightindex} value={obj.earning_deduction_id}>
                              <option value="-1"> --Select--</option>
                              {
                                dashboard.allEarnings?.map((x) => {
                                  return <option disabled={defEarningList.find(el => el.earning_deduction_id == x.value) ? true : false} value={x.value}> {x.label} </option>
                                })}

                            </select>
                          </td>
                          {/* <td>
                            {obj.earningName}
                          </td> */}
                          <td>
                            <select value={obj.calculation_type} onChange={handleFieldChanged} id={'calculation_type-' + rightindex} >
                              <option value="-1">--Select--</option>
                              <option value="% Of Basic">% Of Basic</option>
                              <option value="Fixed Amount">Fixed Amount</option>
                            </select>

                          </td>
                          {/* <td>{obj.calculation_type}</td> */}
                          <td>
                            {/* <Field
                        name="basicFactorEarn"
                        component={Input}
                        value={obj.factorValue} id={'factorValue-' + rightindex}
                        disabled={obj.calculation_type == "Fixed Amount"}
                        placeholder="Enter Basic Factor" 
                        onChange={handleFieldChanged}
                        label={<span> Basic Factor<span style={{ color: 'red' }}>*</span></span>}
                        autoComplete="off"
                      /> */}

                            {<input name='basicFactorEarn' disabled={obj.calculation_type == "Fixed Amount"} style={{ width: "80px" }} type="number" onChange={handleFieldChanged}
                              value={obj.factorValue} id={'factorValue-' + rightindex}></input>}
                          </td>

                          <td>
                            <input disabled={obj.calculation_type == "% Of Basic"} style={{ width: "80px" }} type="number" onChange={handleFieldChanged}
                              value={obj.amount} id={'amount-' + rightindex}></input>
                          </td>
                          <td>
                            <select value={obj.isPartOfGrossSalary} onChange={handleFieldChanged} id={'isPartOfGrossSalary-' + rightindex} >

                              <option selected value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
                          </td>
                        </tr>
                        </>
                      ))}

                    </table>
                    <input type='button' id="Earning" onClick={addRow} value='+Add'></input>
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


                          </select></td>

                          <td>
                            <select value={obj.calculation_type} onChange={handleFieldChanged} id={'calculation_type-' + rightindex} >
                              <option value="-1">--Select--</option>
                              <option value="% Of Basic">% Of Basic</option>
                              <option value="Fixed Amount">Fixed Amount</option>
                            </select>
                          </td>

                          <td> <input style={{ width: "80px" }} type="number" onChange={handleFieldChanged} disabled={obj.calculation_type == "Fixed Amount"} value={obj.factorValue} id={'factorValue-' + rightindex}></input></td>
                          <td><input disabled={obj.calculation_type == "% Of Basic"} style={{ width: "80px" }} type="number"
                            onChange={handleFieldChanged} value={obj.amount} id={'amount-' + rightindex}></input>
                          </td>
                          {/* <td>
                            <select value={obj.isPartOfGrossSalary} onChange={handleFieldChanged} id={'isPartOfGrossSalary-' + rightindex} >
                              <option value="-1">--Select--</option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
                          </td> */}
                        </tr>
                        </>
                      ))}

                    </table>
                    <input type='button' id="Deduction" onClick={addRow} value='+Add'></input>
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
