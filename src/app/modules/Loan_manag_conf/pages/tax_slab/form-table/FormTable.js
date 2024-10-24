
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/redux-Actions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../FormUIHelpers";
import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useFormUIContext } from "../FormUIContext";

export function FormTable() {
  //Users UI Context
  const formUIContext = useFormUIContext();
 
  const formUIProps = useMemo(() => {
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
 

  const { currentState, userAccess } = useSelector(
    (state) => {  console.log("s "); return {
     
      
      currentState: state.loan_management_configuration,
      userAccess: state?.auth?.userAccess["loan_management_configuration"],
    }},
    shallowEqual
  );

 
  const { totalCount, entities, listLoading } = currentState;
 
  //totalCount = 10
 
  const dispatch = useDispatch();
 
  useEffect(() => {
    formUIProps.setIds([]);
 
 
    dispatch(actions.fetchSalarypolicies(formUIProps.queryParams));
  }, [formUIProps.queryParams, dispatch, totalCount]);
 
  const isAccessForEdit = userAccess?.find(
    (item) => item.componentName === "UpdateLoanManagementConfiguration"
  );
 
  const isAccessForDelete = userAccess?.find(
    (item) => item.componentName === "DeleteLoanManagementConfiguration"
  );
  // Table columns
  const columns = [

    {
      dataField: "Subsidiary.formName",
      text: "subsidiary",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
 
 
 
{
  dataField: "Account.formName",
  text: "Account",
  sort: false,
  sortCaret: sortCaret,
  headerSortingClasses,
  style: {
    minWidth: "10px",
  },
 
},
 
 
   
 
    {
      dataField: "EmpLoanAccount.formName",
      text: "employee loan account",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "10px",
      },
    },
 
 
    {
      dataField: "installment_deduction_percentage",
      text: "deduction (%)",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "10px",
      },
    },

    {
      dataField: "t_role.name",
      text: "role",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "10px",
      },
    },
 
    // {
    //   dataField: "installment_deduction_basis_type",
    //   text: "deduction basis type",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    //   style: {
    //     minWidth: "10px",
    //   },
    // },
 
   
 
    
 
       {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditFormDialog: formUIProps.openEditFormDialog,
        openDeleteFormDialog: formUIProps.openDeleteFormDialog,
        openActiveFormDialog: formUIProps.openActiveFormDialog,
        openReadFormDialog: formUIProps.openReadFormDialog,
        isAccessForEdit: isAccessForEdit ? isAccessForEdit.isAccess : false,
        isAccessForDelete: isAccessForDelete
          ? isAccessForDelete.isAccess
          : false,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "10px",
       
      },
    },
  ];
 
  //Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: formUIProps.queryParams.pageSize,
    page: formUIProps.queryParams.pageNumber,
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
                  formUIProps.setQueryParams
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
    </>
  );
}
 