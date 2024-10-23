import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/formActions";

import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../FormUIHelpers";
import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter";
import { Checkbox, Input, Pagination, Select } from "../../../../../../_metronic/_partials/controls";
import { useFormUIContext } from "../FormUIContext";
import { DatetimeColumnFormatter } from "../../../../Dashboard/pages/dashboard/last-trips-vehicles-table/column-formatter/CreatedColumnFormatter";
import { fetchAllActiveEmployeesSalaryForDDL, fetchAllDeductionList, fetchAllEarningList, fetchAllFormsMenu } from "../../../../../../_metronic/redux/dashboardActions";
import { Formik, Field } from "formik";
import { Form, Modal } from "react-bootstrap";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
import { toast } from "react-toastify";

export function FormTable(user
  , isUserForRead
  , loading,

  usersUIProps,
  onHide,
  id


) {
  //Users UI Context
  const formUIContext = useFormUIContext();

  const FormUIProps = useMemo(() => {
    return {
      ids: formUIContext.ids,
      setIds: formUIContext.setIds,
      queryParams: formUIContext.queryParams,
      setQueryParams: formUIContext.setQueryParams,
      openEditFormDialog: formUIContext.openEditFormDialog,
      openDeleteFormDialog: formUIContext.openDeleteFormDialog,
      openActiveFormDialog: formUIContext.openActiveFormDialog,
      openReadFormDialog: formUIContext.openReadFormDialog,
    };
  }, [formUIContext]);

  // console.log("queryparms", usersUIProps.queryparms)

  console.log("::temp::", user);

  const { currentState, userAccess } = useSelector(
    (state) => {
      return {

        currentState: state.payroll_process_policy,
        userAccess: state?.auth?.userAccess["Payroll_Process_Policy"],
      }
    },
    shallowEqual
  );
  console.log("::currentState::::: ", currentState.userForEdit);

  const { totalCount, entities, listLoading } = currentState;

  const { dashboard } = useSelector((state) => state);
  const [defSubsidiary = null, setDefualtSubsidiaryList] = useState(null);
  const [defEmployee = null, setEmployeeDefault] = useState(null);
  //totalCount = 10
  const [defPayrollGroupId = null, setDefaultPayrollGroup] = useState(null);
  const [defBasicPayGeneralAccount = null, setDefaultBasicPayAccount] = useState(null);
  const [defPayrollPayableccount = null, setDefaultPaybleAccount] = useState(null);
  const [defMapDeductionList = null, setDefaultMapDeductionList] = useState(null);
  const [defMapEarningDeductionList = null, setDefaultMapEarningDeductionList] = useState([]);
  const [isCheckedAtt_Integration, setChkAtt_Integration] = useState(false);
  const [defBankInfoList = null, setDefaultBankInfoList] = useState([]);
  const [defEmailRecipents, setDefaultEmailRecipents] = useState([]); //  For Email Recipents
  const [defEOBIAllowances, setDefaultEOBIAllowances] = useState([]);
  const [defSESSIAllowances, setDefaultSESSIAllowances] = useState([]);

  const dispatch = useDispatch();




  useEffect(() => {


    FormUIProps.setIds([]);
    dispatch(actions.fetchUsers(FormUIProps.queryParams));
  }, [FormUIProps.queryParams, dispatch, totalCount]);

  const isAccessForEdit = userAccess?.find(
    (item) => item.componentName === "UpdatePayrollProcessPolicy"
  );

  const isAccessForDelete = userAccess?.find(
    (item) => item.componentName === "DeletePayrollProcessPolicy"
  );


  const isAccessForRead = userAccess?.find(
    (item) => item.componentName === "ReadPayrollProcessPolicy"
  );

  const mutliSelectStyle = {
    backgroundColor: '#ffffff',
    padding: '10px',
    overflow: 'scroll',
    height: '170px',
  };


  useEffect(() => {



    if (user.formid) {

      console.log("::ggg", user.formid);
      dispatch(actions.fetchUser(user.formid));



      // setDefaultBankInfoList([...currentState.userForEdit?.tran_payroll_policy_bank_infos]);



    }


  }, [user.formid]);



  useEffect(() => {

    if (!user.deptId) {

      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsisidaries
      dispatch(fetchAllActiveEmployeesSalaryForDDL(null)); // For Getting Salaried Employees
      dispatch(fetchAllFormsMenu(127, "allChildMenus")); // For Payroll Group
      dispatch(fetchAllFormsMenu(45, "allPayrollAccounts")); // For Basic Pay Accounts
      dispatch(fetchAllFormsMenu(45, "allPayrollPayableAccounts")); // For Payable Accounts
      dispatch(fetchAllDeductionList(2)); //  For Getting All Deduction Heads
      dispatch(fetchAllEarningList(1));
    }
  }, [dispatch]);


  // For Getting sbus
  // useEffect(() => {

  //   const subsidiaryId = defSubsidiary?.value ? defSubsidiary.value : user.subsidiaryId;

  //   setDefualtSubsidiaryList(
  //     dashboard.allSubidiaryList &&
  //     dashboard.allSubidiaryList.filter((item) => {
  //       return item.value === subsidiaryId;
  //     })
  //   );

  // }, [user?.subsidiaryId, dashboard.subsidiaryId]);


  useEffect(() => {
    const payroll_groupId = defPayrollGroupId?.value ? defPayrollGroupId.value : user.payroll_groupId;
    setDefaultPayrollGroup(
      dashboard.allChildMenus &&
      dashboard.allChildMenus.filter((item) => {
        return item.value === payroll_groupId;
      })
    );

  }, [user?.payroll_groupId, dashboard.payroll_groupId]);


  useEffect(() => {
    const basic_pay_accountId = defBasicPayGeneralAccount?.value ? defBasicPayGeneralAccount.value : user.basic_pay_accountId;
    setDefaultBasicPayAccount(
      dashboard.allPayrollAccounts &&
      dashboard.allChildMenus.filter((item) => {
        return item.value === basic_pay_accountId;
      })
    );

  }, [user?.basic_pay_accountId, dashboard.basic_pay_accountId]);


  useEffect(() => {
    const payroll_payable_accountId = defBasicPayGeneralAccount?.value ? defBasicPayGeneralAccount.value : user.payroll_payable_accountId;
    setDefaultBasicPayAccount(
      dashboard.allPayrollPayableAccounts &&
      dashboard.allPayrollPayableAccounts.filter((item) => {
        return item.value === payroll_payable_accountId;
      })
    );

  }, [user?.payroll_payable_accountId, dashboard.payroll_payable_accountId]);

  useEffect(() => {
    const payroll_approverId = user.payroll_approverId; // defEmployee?.value ? defEmployee.value : user.employeeId;

    setEmployeeDefault(
      dashboard.allEmployeesSalaryDDL &&
      dashboard.allEmployeesSalaryDDL.filter((item) => {
        return item.value === payroll_approverId;
      })
    );

  }, [user?.payroll_approverId, dashboard.payroll_approverId]);

  useEffect(() => {

    const emailList = currentState.userForEdit?.tran_email_recipents_setups.map((x) => {
      return x.employeeId
    }) || [];
    setDefaultEmailRecipents(
      [...emailList]
    );
  }, [currentState.userForEdit?.tran_email_recipents_setups]);

  useEffect(() => {

    const bankInfoList = currentState.userForEdit?.tran_payroll_policy_bank_infos.map((x) => {
      return x
    }) || [];
    setDefaultBankInfoList(
      [...bankInfoList]
    );
  }, [currentState.userForEdit?.tran_payroll_policy_bank_infos]);


  useEffect(() => {
    const eobiAllowance = currentState.userForEdit?.tran_payroll_policy_eobiAllowances.map((x) => {
      return x.earningId
    }) || [];
    setDefaultEOBIAllowances(
      [...eobiAllowance]
    );
  }, [currentState.userForEdit?.tran_payroll_policy_eobiAllowances]);

  // FOR SESSI List Configuration
  useEffect(() => {
    const sessiAllowance = currentState.userForEdit?.tran_payroll_policy_sessiAllowances.map((x) => {
      return x.earningId
    }) || [];
    setDefaultSESSIAllowances(
      [...sessiAllowance]
    );
  }, [currentState.userForEdit?.tran_payroll_policy_sessiAllowances]);



  const handleCheckboxChangeFor_EmailReciepents = (option) => {
    setDefaultEmailRecipents((prevState) =>
      prevState.includes(option)
        ? prevState.filter(item => item !== option)
        : [...prevState, option]
    );
  };

  const handleCheckboxChangeFor_EOBIAllowances = (option) => {
    setDefaultEOBIAllowances((prevState) =>
      prevState.includes(option)
        ? prevState.filter(item => item !== option)
        : [...prevState, option]
    );
  };

  const handleCheckboxChangeFor_SESSIAllowances = (option) => {
    setDefaultSESSIAllowances((prevState) =>
      prevState.includes(option)
        ? prevState.filter(item => item !== option)
        : [...prevState, option]
    );
  };



  const deleteRowBankInfo = (element) => {

    const data = defBankInfoList;
    data.splice(element.target.id, 1);
    setDefaultBankInfoList([...data])
  }


  const addRowBankInfo = (element) => {
    console.log("click", element.target.id)

    setDefaultBankInfoList([...defBankInfoList, { transactionType: element.target.id }])


  }

  const handleCheckboxChangeForLoan = (event) => {
    setChkAtt_Integration(event.target.checked);
  };

  const handleFieldChanged = (el) => {
    const index = el.target.id.split('-')[1]
    const key = el.target.id.split('-')[0]
    setDefaultBankInfoList([...defBankInfoList.map((val, ind) => {

      if (ind == index) {

        val[key] = key == 'bankAccountNo' ? (el.target.value) : (el.target.value)

      }

      return val
    })])

  }



  // Table columns
  const columns = [
    {
      dataField: "Id",
      text: "ID",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },

    {
      dataField: "subsidiaryId",
      text: "Subsidiary",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },


    {
      dataField: "isActive",
      text: "Active",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditFormDialog: FormUIProps.openEditFormDialog,
        openDeleteFormDialog: FormUIProps.openDeleteFormDialog,
        openActiveFormDialog: FormUIProps.openActiveFormDialog,
        openReadFormDialog: FormUIProps.openReadFormDialog,
        isAccessForEdit: isAccessForEdit ? isAccessForEdit.isAccess : false,
        isAccessForDelete: isAccessForDelete
          ? isAccessForDelete.isAccess
          : false,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "170px",
      },
    },
  ];



  //Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: FormUIProps.queryParams.pageSize,
    page: FormUIProps.queryParams.pageNumber,
  };

  const SavePayrollPolicy = async (user, emailRecipentList, eobiAllowances, bankInfoList, sessiAllowanceList) => {
    console.log("::latest::", id, user);
    if (!user.Id) {
      console.log("crown");
      await dispatch(actions.create_Payroll_Policy(user, emailRecipentList, eobiAllowances, bankInfoList, sessiAllowanceList));
      //  const list = await dispatch(actions.fetchUsers(usersUIProps.queryParams));


    } else {
      console.log("crown 2");
      console.log("getUserStatus", user);

      const payrollUpdateObj = {
        Id: user.Id,
//-- Payroll Configuration ----
        
        subsidiaryId : user.subsidiaryId,
        companyId : user.companyId,
        payroll_templateId : user.payroll_templateId,
        employer_uniqueId : user.employer_uniqueId,
        payroll_approverId : user.payroll_approverId,
        payroll_groupId : user.payroll_groupId,
    
       // -- Email Sender ------------
        sender_emailId : user.sender_emailId,
        employee_email_recipentId : user.employee_email_recipentId,
    
       // -- Accounting Impact ----
        basic_pay_accountId : user.basic_pay_accountId,
        payroll_payable_accountId : user.payroll_payable_accountId,
        isGroupEarningOnAccount : user.isGroupEarningOnAccount,
        isGroupDeduductionOnAccount : user.isGroupDeduductionOnAccount,
        isAccrueGratuityOnPayroll : user.isAccrueGratuityOnPayroll,
    
       // -- Tax : user.companyIdegration
        payrollTax_DeductionTypeId : user.payrollTax_DeductionTypeId,
        arrearTaxDeductionId : user.arrearTaxDeductionId,
        isTrackDeductionHistory : user.isTrackDeductionHistory,
    
        //-- Leave / AAtteandance : user.companyIdegraion
        isEnableAttandance: user.isEnableAttandance ,
        isEnableLeaveManagemenent : user.isEnableLeaveManagemenent,
        isEnableOverTimeCalc : user.isEnableOverTimeCalc,
        leaveDeductionId : user.leaveDeductionId,
        lateCountPerDaySalaryDeduction : user.lateCountPerDaySalaryDeduction,
        leaveEnchashment_EarningId : user.leaveEnchashment_EarningId,
        lateDeductionId : user.lateDeductionId,
        overTimeEarningId : user.overTimeEarningId,
        isEnableSandwichLeavePolicy : user.isEnableSandwichLeavePolicy,
    
//-- Loan : user.companyIdegration	
        isEnableLoan : user.isEnableLoan,
        loanDeductionId : user.loanDeductionId, 
    
        //--  EOBI Configuration
        isEnableEOBI : user.isEnableEOBI,
        eobi_deductionId : user.eobi_deductionId,
        eobi_earningId : user.eobi_earningId,
        //isIncludeBasicisIncludeBasic, user.isIncludeBasicisIncludeBasic,
        eobi_employeer_value_in_percent : user.eobi_employeer_value_in_percent,
        eobi_employee_value_in_percent : user.eobi_employee_value_in_percent,
      
       // --  SESSI Configuration
        isEnableSESSI : user.isEnableSESSI,
        sessi_deductionId : user.sessi_deductionId,
        sessi_earningId : user.sessi_earningId,
        sessi_employeer_value_in_percent : user.sessi_employeer_value_in_percent,
        sessi_employee_value_in_percent : user.sessi_employee_value_in_percent,
      };

      console.log("payrollUpdateObj", payrollUpdateObj);
      await dispatch(actions.update_Payroll_Policy(payrollUpdateObj));
     // await dispatch(actions.fetchUsers(usersUIProps.queryParams));
    }
  };

  console.log("::defBankInfoList::", defBankInfoList)

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden table-hover"
                bootstrap4
                remote
                keyField="Id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  FormUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,

                // })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>

      <Formik
        enableReinitialize={true}
        initialValues={currentState.userForEdit || user}
        // validationSchema={formValidation}
        onSubmit={async (values) => {

          // console.log("input time",new Date('09/24/2024'));
          console.log("::values::", values);
          SavePayrollPolicy(values, defEmailRecipents, defEOBIAllowances, defBankInfoList, defSESSIAllowances);

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
          <>  <Form className="form form-label-right">
            <fieldset >
              <div style={{ height: "250px", zIndex: "1", width: "100%", backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                <h6>Payroll Configuration</h6>
                <div className="from-group row">
                  <div className="col-12 col-md-4 mt-3">
                    <SearchSelect
                      name="subsidiaryId"

                      label={<span> Subsidiary <span style={{ color: 'red' }}>*</span></span>}
                      onBlur={() => {
                        // handleBlur({ target: { name: "countryId" } });
                      }}
                      onChange={(e) => {
                        setFieldValue("subsidiaryId", e.value || null);
                        setDefualtSubsidiaryList(e);
                        //handlePaymenModeChanged(e)
                      }}

                      value={
                        dashboard.allSubidiaryList.find(
                          (option) => option.value === values.subsidiaryId
                        ) || null
                      }
                      error={errors.subsidiaryId}
                      touched={touched.subsidiaryId}
                      options={dashboard.allSubidiaryList}
                    />

                  </div>

                  <div className="col-12 col-md-4 mt-3">

                    <Select
                      className="form-control"
                      name="payroll_templateId"
                      placeholder="Filter by Status"
                      label={<span> Payroll Template</span>}
                      onChange={(e) => {
                        setFieldValue("payroll_templateId", e.target.value);

                      }}
                      onBlur={handleBlur}
                    >
                      <option value="-1">--Select--</option>
                      <option value="1">Payroll Type-Period Name-Subsidiary</option>
                      <option value="2">Payroll Type-Subsidiary-Period-Period Name</option>
                      <option value="3">Subsidiary-Period Name-Payroll Type</option>
                      <option value="4">Subsidiary-Payroll Type-Period Name</option>
                      <option value="5">Period Name-Subsidiary-Payroll Type</option>
                      <option value="6">Period Name-Payroll Type-Subsidiary</option>
                    </Select>

                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <Field
                      name="employer_uniqueId"
                      component={Input}
                      placeholder="Employee Unique ID"
                      label={<span> Employee Unique ID<span style={{ color: 'red' }}>*</span></span>}
                      autoComplete="off"
                    />
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <SearchSelect
                      name="payroll_approverId"
                      label={<span> Payroll Approver<span style={{ color: 'red' }}>*</span></span>}
                      onBlur={() => {
                        // handleBlur({ target: { name: "countryId" } });
                      }}
                      onChange={(e) => {
                        setFieldValue("payroll_approverId", e.value || null);
                        setEmployeeDefault(e);
                        //handlePaymenModeChanged(e)
                      }}

                      value={(dashboard.allEmployeesSalaryDDL.find(
                        (option) => option.value === values.payroll_approverId
                      ) || null)}
                      error={errors.payroll_approverId}
                      touched={touched.payroll_approverId}
                      options={dashboard.allEmployeesSalaryDDL}
                    />

                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <SearchSelect
                      name="payroll_groupId"
                      label={<span> Payroll Group<span style={{ color: 'red' }}>*</span></span>}
                      // isDisabled={isUserForRead}
                      onBlur={() => {
                        // handleBlur({ target: { name: "countryId" } });
                      }}
                      onChange={(e) => {
                        setFieldValue("payroll_groupId", e.value || null);
                        setDefaultPayrollGroup(e);
                        // dispatch(fetchAllFormsMenu(e.value));
                      }}
                      value={(dashboard.allChildMenus.find(
                        (option) => option.value === values.payroll_groupId
                      ) || null)}
                      error={errors.payroll_groupId}
                      touched={touched.payroll_groupId}
                      options={dashboard.allChildMenus}
                    />
                  </div>
                </div>
              </div>
              <br></br>
              {console.log("obj", defPayrollGroupId)}
              <div style={{ height: "250px", zIndex: "1", width: "100%", backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                <h6>Email Preferences</h6>

                <div className="from-group row">
                  <div className="col-12 col-md-4 mt-3">

                    <Select
                      className="form-control"
                      name="sender_emailId"

                      label={<span> Email Sender</span>}
                      onChange={(e) => {
                        setFieldValue("sender_emailId", e.target.value);

                      }}
                      onBlur={handleBlur}
                    >
                      <option value="-1">--Select--</option>
                      <option value="1">hrms@dynasoftcloud.com</option>
                      <option value="2">payroll@dynasoftcloud.com</option>

                    </Select>

                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    Email Recipents
                    <div style={{ backgroundColor: "#ffffff", height: "170px", padding: "10px", overflow: "scroll" }}>

                      <div className="multi-select">

                        <div className="dropdown-label"></div>
                        <div className="dropdown-options" style={{ fontSize: "12px", fontWeight: "bold", padding: "5px" }}>
                          {dashboard.allEmployeesSalaryDDL.map((option) => (
                            <div key={option.value} className="dropdown-option">
                              <input style={{ width: "25px" }}
                                name="employee_email_recipentId"
                                type="checkbox"
                                checked={defEmailRecipents?.includes(option.value)}
                                onChange={() => handleCheckboxChangeFor_EmailReciepents(option.value)}
                              />
                              {option.label}
                            </div>
                          ))}
                          {console.log("pak::", defEmailRecipents)}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br></br>
              <div style={{ height: "250px", zIndex: "1", width: "100%", backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                <h6>Accounting Impact</h6>
                <div className="from-group row">
                  <div className="col-12 col-md-4 mt-3">
                    <SearchSelect
                      name="basic_pay_accountId"
                      label={<span> Basic Pay Journal Account<span style={{ color: 'red' }}>*</span></span>}
                      // isDisabled={isUserForRead}
                      onBlur={() => {
                        // handleBlur({ target: { name: "countryId" } });
                      }}
                      onChange={(e) => {
                        setFieldValue("basic_pay_accountId", e.value || null);
                        setDefaultBasicPayAccount(e);
                        // dispatch(fetchAllFormsMenu(e.value));
                      }}
                      // value={(defBasicPayGeneralAccount || null)}
                      value={
                        dashboard.allPayrollAccounts.find(
                          (option) => option.value === values.basic_pay_accountId
                        ) || null
                      }
                      error={errors.basic_pay_accountId}
                      touched={touched.basic_pay_accountId}
                      options={dashboard.allPayrollAccounts}
                    />
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    <SearchSelect
                      name="payroll_payable_accountId"
                      label={<span> Payroll Payable Account<span style={{ color: 'red' }}>*</span></span>}
                      // isDisabled={isUserForRead}
                      onBlur={() => {
                        // handleBlur({ target: { name: "countryId" } });
                      }}
                      onChange={(e) => {
                        setFieldValue("payroll_payable_accountId", e.value || null);
                        setDefaultPaybleAccount(e);
                        // dispatch(fetchAllFormsMenu(e.value));
                      }}
                      //  value={(defPayrollPayableccount || null)}
                      value={
                        dashboard.allPayrollPayableAccounts.find(
                          (option) => option.value === values.payroll_payable_accountId
                        ) || null
                      }
                      error={errors.payroll_payable_accountId}
                      touched={touched.payroll_payable_accountId}
                      options={dashboard.allPayrollPayableAccounts}
                    />
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    <Select
                      className="form-control"
                      name="isGroupEarningOnAccount"

                      label={<span> Group Earning Account</span>}
                      onChange={(e) => {
                        setFieldValue("isGroupEarningOnAccount", e.target.value);

                      }}
                      onBlur={handleBlur}
                    >
                      <option value="-1">--Select--</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>

                    </Select>

                  </div>

                  <div className="col-12 col-md-4 mt-3">

                    <Select
                      className="form-control"
                      name="isGroupDeduductionOnAccount"

                      label={<span> Group Deduction Account</span>}
                      onChange={(e) => {
                        setFieldValue("isGroupDeduductionOnAccount", e.target.value);

                      }}
                      onBlur={handleBlur}
                    >
                      <option value="-1">--Select--</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>

                    </Select>

                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    <Select
                      className="form-control"
                      name="isAccrueGratuityOnPayroll"

                      label={<span> Accrue Gratuity On Payroll</span>}
                      onChange={(e) => {
                        setFieldValue("isAccrueGratuityOnPayroll", e.target.value);

                      }}
                      onBlur={handleBlur}
                    >
                      <option value="-1">--Select--</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>

                    </Select>
                  </div>
                </div>
              </div>
              <br></br>
              <div style={{ height: "250px", zIndex: "1", width: "100%", backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                <h6>Tax Integration</h6>
                <div className="from-group row">

                  <div className="col-12 col-md-4 mt-3">
                    {<span> Payroll Tax Deduction Type<span style={{ color: 'red' }}>*</span></span>}
                    <select className="form-control"

                      onChange={(e) => {
                        setFieldValue('payrollTax_DeductionTypeId', e.target.value)
                      }}
                      value={values.payrollTax_DeductionTypeId}
                      name="payrollTax_DeductionTypeId">
                      <option value="-1"> --Select--</option>
                      {
                        dashboard.allDeductions?.map((x) => {
                          return <option disabled={defMapEarningDeductionList.find(el => el.earning_deduction_id == x.value) ? true : false} value={x.value}> {x.label} </option>
                        })}
                    </select>
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    {<span> Arrears Tax Deduction <span style={{ color: 'red' }}>*</span></span>}
                    <select className="form-control"

                      onChange={(e) => {
                        setFieldValue('arrearTaxDeductionId', e.target.value)
                      }}
                      value={values.arrearTaxDeductionId}
                      name="arrearTaxDeductionId">
                      <option value="-1"> --Select--</option>
                      {
                        dashboard.allDeductions?.map((x) => {
                          return <option disabled={defMapEarningDeductionList.find(el => el.earning_deduction_id == x.value) ? true : false} value={x.value}> {x.label} </option>
                        })}
                    </select>
                  </div>
                  <div className="col-12 col-md-4 mt-2">

                    <Select
                      className="form-control"
                      name="isTrackDeductionHistory"
                      value={values.isTrackDeductionHistory}
                      label={<span> Track Tax Deduction History</span>}
                      onChange={(e) => {
                        setFieldValue("isTrackDeductionHistory", e.target.value);

                      }}
                      onBlur={handleBlur}
                    >
                      <option value="-1">--Select--</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>

                    </Select>

                  </div>
                </div>
              </div>
              <br></br>
              <div style={{ height: "350px", zIndex: "1", width: "100%", backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                <h6>Leave/Attendance Integration </h6>
                <div className="from-group row">
                  <div className="col-12 col-md-4 mt-3">
                    <input style={{ backgroundColor: "#ffffff", padding: "10px", width: "20px" }}
                      name="isEnableAttandanceIntegration"
                      type="checkbox"
                      onChange={(e) => {
                        setFieldValue('isEnableAttandanceIntegration', e.target.checked)
                      }}
                      checked={values.isEnableAttandanceIntegration}

                    />
                    Enable Attendance Integaration
                    <br></br>


                    <input style={{ backgroundColor: "#ffffff", padding: "10px", width: "20px" }}
                      type="checkbox"
                      name="isEnableLeaveManagemenent"
                      onChange={(e) => {
                        setFieldValue('isEnableLeaveManagemenent', e.target.checked)
                      }}
                      checked={values.isEnableLeaveManagemenent}
                    />
                    Enable Leave Management
                    <br></br>

                    <input style={{ backgroundColor: "#ffffff", padding: "10px", width: "20px" }}
                      type="checkbox"
                      name="isEnableOverTimeCalc"
                      onChange={(e) => {
                        setFieldValue('isEnableOverTimeCalc', e.target.checked)
                      }}
                      checked={values.isEnableOverTimeCalc}
                    />
                    Enable Overtime Calculation
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    {<span> Leave Deduction<span style={{ color: 'red' }}>*</span></span>}
                    <select className="form-control"

                      onChange={(e) => {
                        setFieldValue('leaveDeductionId', e.target.value)
                      }}
                      value={values.leaveDeductionId}
                      name="leaveDeductionId">
                      <option value="-1"> --Select--</option>
                      {
                        dashboard.allDeductions?.map((x) => {
                          return <option value={x.value}> {x.label} </option>
                        })}
                    </select>
                  </div>

                  <div className="col-12 col-md-4 mt-1">
                    <Field
                      name="lateCountPerDaySalaryDeduction"
                      onChange={(e) => {
                        //setGrossSalaryDB(e.target.value);
                        setFieldValue("lateCountPerDaySalaryDeduction", e.target.value);
                      }}
                      value={values.lateCountPerDaySalaryDeduction}
                      component={Input}
                      placeholder="Enter value"
                      label={<span> Late Count Per Day Salary Deduction<span style={{ color: 'red' }}>*</span></span>}
                      autoComplete="off"
                    />
                  </div>

                </div>
                <div className="from-group row">
                  <div className="col-12 col-md-4 mt-3">

                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    {<span> Encashment Allowance<span style={{ color: 'red' }}>*</span></span>}
                    <select className="form-control"
                      onChange={(e) => {
                        setFieldValue('leaveEnchashment_EarningId', e.target.value)
                      }}
                      value={values.leaveEnchashment_EarningId}
                      name="leaveEnchashment_EarningId">
                      <option value="-1"> --Select--</option>
                      {
                        dashboard.allEarnings?.map((x) => {
                          return <option value={x.value}> {x.label} </option>
                        })}
                    </select>
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    {<span> Late Deduction<span style={{ color: 'red' }}>*</span></span>}
                    <select className="form-control"
                      onChange={(e) => {
                        setFieldValue('lateDeductionId', e.target.value)
                      }}
                      value={values.lateDeductionId}
                      name="lateDeductionId">
                      <option value="-1"> --Select--</option>
                      {
                        dashboard.allDeductions?.map((x) => {
                          return <option value={x.value}> {x.label} </option>
                        })}
                    </select>
                  </div>
                </div>


                <div className="from-group row">
                  <div className="col-12 col-md-4 mt-3">

                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    <Select
                      className="form-control"
                      name="isEnableSandwichLeavePolicy"
                      value={values.isEnableSandwichLeavePolicy}
                      label={<span> Enable Sandwich Policy For Leave</span>}
                      onChange={(e) => {
                        setFieldValue("isEnableSandwichLeavePolicy", e.target.value);

                      }}
                      onBlur={handleBlur}
                    >
                      <option value="-1">--Select--</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>

                    </Select>

                  </div>
                  <div className="col-12 col-md-4 mt-5">
                    {<span> Overtime Allowance<span style={{ color: 'red' }}>*</span></span>}
                    <select className="form-control"
                      onChange={(e) => {
                        setFieldValue('overTimeEarningId', e.target.value)
                      }}
                      value={values.overTimeEarningId}
                      name="overTimeEarningId">
                      <option value="-1"> --Select--</option>
                      {
                        dashboard.allEarnings?.map((x) => {
                          return <option value={x.value}> {x.label} </option>
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <br>
              </br>
              <div style={{ height: "200px", zIndex: "1", width: "100%", backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                <h6>Loan Integration </h6>
                <div className="from-group row">

                  <div className="col-12 col-md-4 mt-3">
                    <input style={{ backgroundColor: "#ffffff", padding: "10px", width: "30px" }}
                      name="isEnableLoan"
                      type="checkbox"
                      onChange={(e) => {
                        setFieldValue('isEnableLoan', e.target.checked)
                      }}
                      checked={values.isEnableLoan}
                    />
                    Enable Loan Management
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    {<span> Loan Deduction<span style={{ color: 'red' }}>*</span></span>}
                    <select className="form-control"
                      onChange={(e) => {
                        setFieldValue('loanDeductionId', e.target.value)
                      }}
                      value={values.loanDeductionId}
                      name="loanDeductionId">

                      <option value="-1"> --Select--</option>
                      {
                        dashboard.allDeductions?.map((x) => {
                          return <option value={x.value}> {x.label} </option>
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <br></br>
              <div style={{ height: "350px", zIndex: "1", width: "100%", backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                <h6>EOBI Configuration </h6>
                <div className="from-group row">
                  <div className="col-12 col-md-4 mt-3">
                    <input style={{ backgroundColor: "#ffffff", padding: "10px", width: "30px" }}
                      name="isEnableEOBI"
                      type="checkbox"
                      onChange={(e) => {
                        setFieldValue('isEnableEOBI', e.target.checked)
                      }}
                      checked={values.isEnableEOBI}
                    />
                    Enable EOBI
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                    <input style={{ backgroundColor: "#ffffff", padding: "10px", width: "30px" }}
                      name="isIncludeBasic"
                      type="checkbox"
                      onChange={(e) => {
                        setFieldValue('isIncludeBasic', e.target.checked)
                      }}
                      checked={values.isIncludeBasic}
                    />
                    Include Basic
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    {<span> EOBI Deduction<span style={{ color: 'red' }}>*</span></span>}
                    <select className="form-control"

                      onChange={(e) => {
                        setFieldValue('eobi_deductionId', e.target.value)
                      }}
                      value={values.eobi_deductionId}
                      name="eobi_deductionId">
                      <option value="-1"> --Select--</option>
                      {
                        dashboard.allDeductions?.map((x) => {
                          return <option value={x.value}> {x.label} </option>
                        })}
                    </select>
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    <Field
                      name="eobi_employeer_value_in_percent"
                      component={Input}
                      type="Number"
                      placeholder="Employeer value"
                      value={values.eobi_employeer_value_in_percent}
                      label={<span> Employeer(%)<span style={{ color: 'red' }}>*</span></span>}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    <Field
                      name="eobi_employee_value_in_percent"
                      component={Input}
                      type="Number"
                      placeholder="Employee value"
                      value={values.eobi_employee_value_in_percent}
                      label={<span> Employee(%)<span style={{ color: 'red' }}>*</span></span>}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    EOBI Allowances
                    <div style={{ backgroundColor: "#ffffff", height: "170px", padding: "10px", overflow: "scroll" }}>

                      <div className="multi-select">

                        <div className="dropdown-label"></div>
                        <div className="dropdown-options" style={{ fontSize: "12px", fontWeight: "bold", padding: "5px" }}>
                          {dashboard.allEarnings.map((option) => (
                            <div key={option.value} className="dropdown-option">
                              <input style={{ width: "25px" }}
                                name="eobi_earningId"
                                type="checkbox"
                                checked={defEOBIAllowances?.includes(option.value)}
                                onChange={() => handleCheckboxChangeFor_EOBIAllowances(option.value)}
                              />
                              {option.label}
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>

              <br></br>
              <div style={{ height: "350px", zIndex: "1", width: "100%", backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                <h6>SESSI Configuration </h6>
                <div className="from-group row">
                  <div className="col-12 col-md-4 mt-3">
                    <input style={{ backgroundColor: "#ffffff", padding: "10px", width: "30px" }}
                      name="isEnableSESSI"
                      type="checkbox"
                      onChange={(e) => {
                        setFieldValue('isEnableSESSI', e.target.checked)
                      }}
                      checked={values.isEnableSESSI}
                    />
                    Enable SESSI
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                  </div>
                  {/* <div className="col-12 col-md-4 mt-3">
                    <input style={{ backgroundColor: "#ffffff", padding: "10px", width: "30px" }}
                      name="isIncludeBasic"
                      type="checkbox"
                      onChange={(e) => {
                        setFieldValue('isIncludeBasic', e.target.checked)
                      }}
                      checked={values.isIncludeBasic}
                    />
                    Include Basic
                  </div> */}

                  <div className="col-12 col-md-4 mt-3">
                    {<span> SESSI Deduction<span style={{ color: 'red' }}>*</span></span>}
                    <select className="form-control"

                      onChange={(e) => {
                        setFieldValue('sessi_deductionId', e.target.value)
                      }}
                      value={values.sessi_deductionId}
                      name="sessi_deductionId">
                      <option value="-1"> --Select--</option>
                      {
                        dashboard.allDeductions?.map((x) => {
                          return <option value={x.value}> {x.label} </option>
                        })}
                    </select>
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    <Field
                      name="sessi_employeer_value_in_percent"
                      component={Input}
                      type="Number"
                      placeholder="Employeer value"
                      value={values.sessi_employeer_value_in_percent}
                      label={<span> Employeer(%)<span style={{ color: 'red' }}>*</span></span>}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    <Field
                      name="sessi_employee_value_in_percent"
                      component={Input}
                      type="Number"
                      placeholder="Employee value"
                      value={values.sessi_employee_value_in_percent}
                      label={<span> Employee(%)<span style={{ color: 'red' }}>*</span></span>}
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-12 col-md-4 mt-3">
                    SESSI Allowances
                    <div style={{ backgroundColor: "#ffffff", height: "170px", padding: "10px", overflow: "scroll" }}>

                      <div className="multi-select">

                        <div className="dropdown-label"></div>
                        <div className="dropdown-options" style={{ fontSize: "12px", fontWeight: "bold", padding: "5px" }}>
                          {dashboard.allEarnings.map((option) => (
                            <div key={option.value} className="dropdown-option">
                              <input style={{ width: "25px" }}
                                name="sessi_earningId"
                                type="checkbox"
                                checked={defSESSIAllowances?.includes(option.value)}
                                onChange={() => handleCheckboxChangeFor_SESSIAllowances(option.value)}
                              />
                              {option.label}
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ height: "350px", zIndex: "1", width: "100%", backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                <h6>Other </h6>
                <div className="from-group row">
                  <table class="table table table-head-custom table-vertical-center overflow-hidden table-hover">
                    <h7><b>Journal Accounts & Bank Info</b>
                    </h7>
                    <tr style={{ backgroundColor: '#4d5f7a', color: '#fff' }}>
                      {/* <td>Employee</td> */}
                      <td>Action</td>
                      <td>Journal Bank Acc#</td>
                      <td>Bank Code Employer</td>
                      <td>Bank Account No</td>
                      <td>IsDefault</td>
                      <td>Bank Name</td>
                    </tr>
                    {defBankInfoList?.map((obj, rightindex) => (

                      <><tr>
                        <td id={rightindex} >
                          <button id={rightindex} className="btn btn-danger btn-sm" onClick={deleteRowBankInfo}>Delete</button></td>
                        <td><select value={obj.journalBankAccountId} className="form-control" onChange={handleFieldChanged} id={"journalBankAccountId-" + rightindex}>
                          <option selected="true" value="-1">--SELECT--</option>
                          <option value="1">Journal-Natioal-099883311</option>
                          <option value="2">Journal-Allied-A88-001</option>
                          <option value="3">Journal-TMP-SILK-018-001</option>
                        </select> </td>

                        <td> <input className="form-control" onChange={handleFieldChanged} placeholder="Enter Bank Code" value={obj.bankCode} type="number" id={"bankCode-" + rightindex}></input> </td>

                        <td><input type="number" className="form-control" placeholder="Enter Bank Account No" value={obj.bankAccountNo} onChange={handleFieldChanged} id={"bankAccountNo-" + rightindex}></input></td>
                        <td>  <input style={{ backgroundColor: "#ffffff", padding: "10px", width: "40px", height: "20px" }}

                          type="checkbox"
                          id={"isDefault-" + rightindex}
                          onChange={handleFieldChanged}
                          isSelected={obj.isDefault}

                        />
                        </td>

                        <td> <input type="text" className="form-control" placeholder="Enter Bank Name" onChange={handleFieldChanged} value={obj.bankName} id={'bankName-' + rightindex}></input></td>

                      </tr>
                      </>
                    ))}

                  </table>

                  <div className="from-group row">
                    <div className="col-12 col-md-4 mt-3">
                      <input type='button' className="btn btn-primary" id="bank_info" onClick={addRowBankInfo} value='+Add'></input>
                    </div>

                  </div>
                </div>
              </div>


            </fieldset>


          </Form>

            <div className="from-group row">
              <div className="col-12 col-md-4 mt-3">
                {isAccessForRead && (
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
              </div>
            </div>
          </>

        )}


      </Formik >
    </>
  );
}
