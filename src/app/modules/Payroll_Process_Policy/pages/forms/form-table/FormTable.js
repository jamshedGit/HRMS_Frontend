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
import { Input, Pagination } from "../../../../../../_metronic/_partials/controls";
import { useFormUIContext } from "../FormUIContext";
import { DatetimeColumnFormatter } from "../../../../Dashboard/pages/dashboard/last-trips-vehicles-table/column-formatter/CreatedColumnFormatter";
import { fetchAllFormsMenu } from "../../../../../../_metronic/redux/dashboardActions";
import { Formik, Field } from "formik";
import { Form, Modal } from "react-bootstrap";
import { SearchSelect } from "../../../../../../_metronic/_helpers/SearchSelect";
export function FormTable(user
  , isUserForRead
  , loading

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

  //console.log("queryparms", usersUIProps.queryparms)
  const { currentState, userAccess } = useSelector(
    (state) => {
      console.log("state23323 ", state); return {

        currentState: state.payroll_process_policy,
        userAccess: state?.auth?.userAccess["Payroll_Process_Policy"],
      }
    },
    shallowEqual
  );
  console.log("::currentState::::: ", currentState);

  const { totalCount, entities, listLoading } = currentState;

  const { dashboard } = useSelector((state) => state);
  const [defSubsidiary = null, setDefualtSubsidiaryList] = useState(null);
  //totalCount = 10

  const dispatch = useDispatch();

  useEffect(() => {
    FormUIProps.setIds([]);

    dispatch(actions.fetchUsers(FormUIProps.queryParams));
  }, [FormUIProps.queryParams, dispatch, totalCount]);

  const isAccessForEdit = userAccess?.find(
    (item) => item.componentName === "UpdatePayrollMonth"
  );

  const isAccessForDelete = userAccess?.find(
    (item) => item.componentName === "DeletePayrollMonth"
  );

  useEffect(() => {

    if (!user.deptId) {

      dispatch(fetchAllFormsMenu(133, "allSubidiaryList")); // For All Subsisidaries
      // dispatch(fetchAllFormsMenu(87));
    }
  }, [dispatch]);

  useEffect(() => {

    const subsidiaryId = defSubsidiary?.value ? defSubsidiary.value : user.subsidiaryId;

    setDefualtSubsidiaryList(
      dashboard.allSubidiaryList &&
      dashboard.allSubidiaryList.filter((item) => {
        return item.value === subsidiaryId;
      })
    );

  }, [user?.subsidiaryId, dashboard.subsidiaryId]);



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
      dataField: "startDate",
      text: "Start Date",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },

    {
      dataField: "endDate",
      text: "end Date",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "month",
      text: "Month",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "month_days",
      text: "Days",
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
        initialValues={user}
        // validationSchema={formValidation}
        onSubmit={async (values) => {

          // console.log("input time",new Date('09/24/2024'));



          // fnSaveSalaryRevision([values], defOld_MapEarningDeductionList, defNew_MapEarningDeductionList);

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
              <div style={{ height: "500px", zIndex: "1", width: "100%", backgroundColor: "rgb(235 243 255)", padding: "20px", borderRadius: "5px", border: '2px solid #adceff' }}>
                <h6>Payroll Configuration</h6>
                <div className="from-group row">
                  <div className="col-12 col-md-4 mt-3">
                    <SearchSelect
                      name="subsidiaryId"
                      label={<span> Subsidiary<span style={{ color: 'red' }}>*</span></span>}

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

                  </div>

                  <div className="col-12 col-md-4 mt-3">
                 
                    <SearchSelect
                      className="form-control"
                      name="payroll_templateId"
                      placeholder="Filter by Status"
                      label= {<span> Payroll Template</span>}
                      onChange={(e) => {
                        setFieldValue("payroll_templateId", e.target.value);
                        handleSubmit();
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
                    </SearchSelect>

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
                </div>
              </div>
              <br></br>

            </fieldset>


          </Form>
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
          </>

        )}


      </Formik >
    </>
  );
}
