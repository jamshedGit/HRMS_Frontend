
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/redux-Actions";
import { format } from 'date-fns';
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
import { Accordion, Button, Card } from "react-bootstrap";
import { KeyboardArrowDown } from "@material-ui/icons";
import { formatNumberWithCommas } from "../../../../../utils/common";

export function FormTable() {
  //Users UI Context
  const formUIContext = useFormUIContext();
 
  const formUIProps = useMemo(() => {

    return {
      ids: formUIContext.ids,
      setIds: formUIContext.setIds,
      setIsFileReq:formUIContext.setIsFileReq,
      employeeId: formUIContext.employeeId,
      queryParams: formUIContext.queryParams,
      setQueryParams: formUIContext.setQueryParams,
      openEditFormDialog: formUIContext.openEditFormDialog,
      openDeleteFormDialog: formUIContext.openDeleteFormDialog,
      openActiveFormDialog: formUIContext.openActiveFormDialog,
      openReadFormDialog: formUIContext.openReadFormDialog,
    };
  }, [formUIContext]);
 

  const { currentState, userAccess } = useSelector(
    (state) => {console.log("state",state);  return {
     
      
      currentState: state.employee_profile,
      userAccess: state?.auth?.userAccess["employee_profile"],
    }},
    shallowEqual
  );

  console.log("currentState",currentState)
  const { totalCount, entities, listLoading } = currentState;

  // totalCount = 10
 
  const dispatch = useDispatch();
 
  useEffect(() => {
  
    formUIProps.setIds("");
 
 
    dispatch(actions.fetchReimbursementClaim(formUIProps));
  }, [formUIProps.queryParams, dispatch, totalCount,formUIProps.employeeId]);
 
  const isAccessForEdit = userAccess?.find(
    (item) => item.componentName === "UpdateEmployeeProfile"
  );
 
  const isAccessForDelete = userAccess?.find(
    (item) => item.componentName === "DeleteEmployeeProfile"
  );
  // Table columns
  const columns = [
    {
      dataField: "employeeCode",
      text: "Employee Code",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
 
 
 
{
  dataField: "fullName",
  text: "Full Name",
  sort: false,
  sortCaret: sortCaret,
  headerSortingClasses,
  style: {
    minWidth: "10px",
  },
 
},
 

    {
      dataField: "department.deptName",
      text: "Department",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "10px",

      },
   
      formatter: (cell) => formatNumberWithCommas(cell), 
    
    },
    {
      dataField: "designation.formName",
      text: "Designation",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "10px",
       
      },
   
      formatter: (cell) => formatNumberWithCommas(cell), 
    
    },

    {
      dataField: "dateOfJoining",
      text: "date Of Joining",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "10px",
       
      },
   
      formatter: (cell) => formatNumberWithCommas(cell), 
    
    },
       {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        setIds:formUIProps.setIds,
        setIsFileReq:formUIProps.setIsFileReq,
        openEditFormDialog: formUIProps.openEditFormDialog,
        openDeleteFormDialog: formUIProps.openDeleteFormDialog,
        // openActiveFormDialog: formUIProps.openActiveFormDialog,
        // openReadFormDialog: formUIProps.openReadFormDialog,
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
  
    {/* <Accordion defaultActiveKey="">
      <Card>
        <Card.Header className="d-flex justify-content-center">
        <div className='accordion-header-btn w-100  d-flex justify-content-center'>
          <Accordion.Toggle  eventKey="0" className="flex-between-center text-bold">
            Reimbursement Claim Details
            <KeyboardArrowDown />
          </Accordion.Toggle>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
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

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion> */}
 
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
 