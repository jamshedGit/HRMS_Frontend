import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/usersActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../.././../_metronic/_helpers";
import * as uiHelpers from "../UsersUIHelpers";
import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useUsersUIContext } from "../UsersUIContext";
import { DatetimeColumnFormatter } from "../../../../Dashboard/pages/dashboard/last-trips-vehicles-table/column-formatter/CreatedColumnFormatter";

export function ReceiptsTable() {
  //Users UI Context
  const receiptUIContext = useUsersUIContext();

  const receiptUIProps = useMemo(() => {
    return {
      ids: receiptUIContext.ids,
      setIds: receiptUIContext.setIds,
      queryParams: receiptUIContext.queryParams,
      setQueryParams: receiptUIContext.setQueryParams,
      openEditUserDialog: receiptUIContext.openEditUserDialog,
      openDeleteUserDialog: receiptUIContext.openDeleteUserDialog,
      openActiveUserDialog: receiptUIContext.openActiveUserDialog,
      openReadUserDialog: receiptUIContext.openReadUserDialog,
    };
  }, [receiptUIContext]);

  //console.log("queryparms", usersUIProps.queryparms)
  const { currentState, userAccess } = useSelector(
    (state) => ({
      currentState: state.receipt,
      userAccess: state?.auth?.userAccess["EDRS"],
    }),
    shallowEqual
  );
  
  const { totalCount, entities, listLoading } = currentState;

  //totalCount = 10

  const dispatch = useDispatch();

  useEffect(() => {
   
    receiptUIProps.setIds([]);
    console.log("test 2",receiptUIProps.queryParams)
    dispatch(actions.fetchUsers(receiptUIProps.queryParams));
  }, [receiptUIProps.queryParams, dispatch, totalCount]);

  const isAccessForEdit = userAccess?.find(
    (item) => item.componentName === "UpdateReceipt"
  );

  const isAccessForDelete = userAccess?.find(
    (item) => item.componentName === "DeleteReceipt"
  );
  // Table columns
  const columns = [
    // {
    //   dataField: "receiptId",
    //   text: "ID",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    // },
    {
      dataField: "donorName",
      text: "Donor Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "phoneno",
      text: "Contact No",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "receiptNo",
      text: "Receipt No",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
        maxWidth: "130px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    {
      dataField: "bookNo",
      text: "Book No",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
        maxWidth: "130px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    {
      dataField: "type",
      text: "Donation Type",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "160px",
      },
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: DatetimeColumnFormatter,
      style: {
        minWidth: "130px",
      },
    },
   
    {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditUserDialog: receiptUIProps.openEditUserDialog,
        openDeleteUserDialog: receiptUIProps.openDeleteUserDialog,
        openActiveUserDialog: receiptUIProps.openActiveUserDialog,
        openReadUserDialog: receiptUIProps.openReadUserDialog,
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
    sizePerPage: receiptUIProps.queryParams.pageSize,
    page: receiptUIProps.queryParams.pageNumber,
  };

  //console.log("entities", entities);

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
                keyField="receiptId"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  receiptUIProps.setQueryParams
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
