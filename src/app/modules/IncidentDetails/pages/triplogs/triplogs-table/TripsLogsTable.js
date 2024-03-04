import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/triplogs/triplogActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../TripLogsUIHelpers";
// import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter"
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useTripLogsUIContext } from "../TripLogsUIContext";
import * as columnFormatters from "./column-formatter";
// import {
//   FormClasses,
//   Http,
//   OperationStatus,
//   RedirectURLs,
// } from "../../../../../utils/constants";
// import { getDate, listingRedirection } from "../../../../../utils/common";

export function TripLogsTable() {
  //Users UI Context
  const triplogsUIContext = useTripLogsUIContext();

  const triplogsUIProps = useMemo(() => {
    return {
      ids: triplogsUIContext.ids,
      setIds: triplogsUIContext.setIds,
      queryParams: triplogsUIContext.queryParams,
      setQueryParams: triplogsUIContext.setQueryParams,
      openEditUserDialog: triplogsUIContext.openEditUserDialog,
      openDeleteUserDialog: triplogsUIContext.openDeleteUserDialog,
      openReadUserDialog: triplogsUIContext.openReadUserDialog,
    };
  }, [triplogsUIContext]);

  // console.log("triplogsUIProps", triplogsUIProps)
  const { currentState, userAccess } = useSelector(
    (state) => ({
      currentState: state.triplogs,
      userAccess: state.auth.userAccess,
    }),
    shallowEqual
  );

  //console.log("userAccess", currentState)

  const { totalCount, entities, listLoading } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    // triplogsUIProps.setIds([])
    dispatch(actions.fetchTripLogs(triplogsUIProps.queryParams));
  }, [triplogsUIProps.queryParams, dispatch]);

  const AccessForEdit = () => {
    const forEdit = userAccess["Incident Details"].find(
      (item) => item.componentName === "UpdateIncidentDetail"
    );
    return forEdit?.isAccess;
  };

  const AccessForDelete = () => {
    const forDelete = userAccess["Incident Details"].find(
      (item) => item.componentName === "DeleteIncidentDetail"
    );
    return forDelete?.isAccess;
  };

  console.log("entities", entities);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "sourcecenter.name",
      text: "Center Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "driver.firstName",
      text: "DriverName",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "driver.phNo",
      text: "Contact",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "dateTime",
      text: "Start Time",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: columnFormatters.DatetimeColumnFormatter,
      // (cell) => {
      //   let dateObj = cell
      //   if (typeof cell !== "object") {
      //     dateObj = new Date(cell)
      //   }
      //   return `${("0" + dateObj.getUTCDate()).slice(-2)}/${(
      //     "0" +
      //     (dateObj.getUTCMonth() + 1)
      //   ).slice(-2)}/${dateObj.getUTCFullYear()} ${dateObj.toLocaleTimeString(
      //     "en-US"
      //   )} `
      // },
    },
    {
      dataField: "endDateTime",
      text: "End Time",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: columnFormatters.DatetimeColumnFormatter,
    },
    {
      dataField: "finalReading",
      text: "Meter Reading",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "price",
      text: "Price",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "logBookNo",
      text: "log BkNo",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "status",
      text: "status",
      sort: false,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    // {
    //   dataField: "createdAt",
    //   text: "Created At",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    //   formatter: columnFormatters.DatetimeColumnFormatter,
    // (cell) => {
    // return `${getDate(cell)}`
    // return <span className={`label label-sm label-light `}>{getDate(cell)}</span>
    // let dateObj = cell
    // if (typeof cell !== "object") {
    //   dateObj = new Date(cell)
    // }
    // return `${getDate(cell)}`
    // return `${("0" + dateObj.getUTCDate()).slice(-2)}/${(
    //   "0" +
    //   (dateObj.getUTCMonth() + 1)
    // ).slice(-2)}/${dateObj.getUTCFullYear()}`
    // },
    // },
    {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUserDialog: triplogsUIProps.openEditUserDialog,
        openDeleteUserDialog: triplogsUIProps.openDeleteUserDialog,
        openReadUserDialog: triplogsUIProps.openReadUserDialog,
        isAccessForEdit: AccessForEdit(),
        isAccessForDelete: AccessForDelete(),
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      // style: {
      //   minWidth: "100px",
      // },
    },
  ];

  //Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: triplogsUIProps.queryParams.pageSize,
    page: triplogsUIProps.queryParams.pageNumber,
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
                //classes="table table-head-custom table-vertical-center overflow-hidden"
                //bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  triplogsUIProps.setQueryParams
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
