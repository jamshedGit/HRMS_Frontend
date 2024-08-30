import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/deptActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../DeptUIHelpers";
import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useDeptUIContext } from "../DeptUIContext";
import { DatetimeColumnFormatter } from "../../../../Dashboard/pages/dashboard/last-trips-vehicles-table/column-formatter/CreatedColumnFormatter";

export function DeptTable() {
  //Users UI Context
  const deptUIContext = useDeptUIContext();

  const deptUIProps = useMemo(() => {
    return {
      ids: deptUIContext.ids,
      setIds: deptUIContext.setIds,
      queryParams: deptUIContext.queryParams,
      setQueryParams: deptUIContext.setQueryParams,
      openEditDeptDialog: deptUIContext.openEditDeptDialog,
      openDeleteDeptDialog: deptUIContext.openDeleteDeptDialog,
      openActiveDeptDialog: deptUIContext.openActiveDeptDialog,
      openReadDeptDialog: deptUIContext.openReadDeptDialog,
    };
  }, [deptUIContext]);

  //console.log("queryparms", usersUIProps.queryparms)
  const { currentState, userAccess } = useSelector(
    (state) => {  console.log("state ",state); return {
      
      currentState: state.dept,
      userAccess: state?.auth?.userAccess["Department"],
    }},
    shallowEqual
  );
  console.log("currentState", currentState);
  
  const { totalCount, entities, listLoading } = currentState;

  //totalCount = 10

  const dispatch = useDispatch();

  useEffect(() => {
    deptUIProps.setIds([]);
    console.log("test 2",deptUIProps.queryParams)
    dispatch(actions.fetchUsers(deptUIProps.queryParams));
  }, [deptUIProps.queryParams, dispatch, totalCount]);

  const isAccessForEdit = userAccess?.find(
    (item) => item.componentName === "UpdateDept"
  );

  const isAccessForDelete = userAccess?.find(
    (item) => item.componentName === "DeleteDept"
  );
  // Table columns
  const columns = [
    
    {
      dataField: "deptName",
      text: "Department",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "deptCode",
      text: "Code",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "parentDept",
      text: "Parent Dept",
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
        openEditDeptDialog: deptUIProps.openEditDeptDialog,
        openDeleteDeptDialog: deptUIProps.openDeleteDeptDialog,
        openActiveDeptDialog: deptUIProps.openActiveDeptDialog,
        openReadDeptDialog: deptUIProps.openReadDeptDialog,
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
    sizePerPage: deptUIProps.queryParams.pageSize,
    page: deptUIProps.queryParams.pageNumber,
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
                  deptUIProps.setQueryParams
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
