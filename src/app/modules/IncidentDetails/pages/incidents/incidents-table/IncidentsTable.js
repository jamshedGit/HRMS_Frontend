import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/incidents/incidentActions";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../IncidentsUIHelpers";
// import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter"
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useIncidentsUIContext } from "../IncidentsUIContext";
import * as columnFormatters from "./column-formatter";

export function IncidentsTable() {
  //Users UI Context
  const incidentsUIContext = useIncidentsUIContext();

  const incidentsUIProps = useMemo(() => {
    return {
      ids: incidentsUIContext.ids,
      setIds: incidentsUIContext.setIds,
      queryParams: incidentsUIContext.queryParams,
      setQueryParams: incidentsUIContext.setQueryParams,
      openEditUserDialog: incidentsUIContext.openEditUserDialog,
      openDeleteUserDialog: incidentsUIContext.openDeleteUserDialog,
      openReadUserDialog: incidentsUIContext.openReadUserDialog,
      openTripLogDialog: incidentsUIContext.openTripLogDialog,
    };
  }, [incidentsUIContext]);

  const { currentState, userAccess, editAccessStatus } = useSelector(
    (state) => ({
      currentState: state.incidentDetails,
      userAccess: state.auth.userAccess,
      editAccessStatus: state,
    }),
    shallowEqual
  );
  //console.log("editAccessStatus", editAccessStatus);
  const { totalCount, entities, listLoading } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(actions.fetchIncidents(incidentsUIProps.queryParams));
      await dispatch(actions.fetchCenters());
    }
    fetchData();
  }, [incidentsUIProps.queryParams]);

  useEffect(() => {
    dispatch(actions.fetchIncidentTypes());
    dispatch(actions.fetchSeverityTypes());
  }, [dispatch]);

  // useEffect(() => {

  //   dispatch(actions.fetchIncidents(incidentsUIProps.queryParams))
  //   dispatch(actions.fetchIncidentTypes())
  //   dispatch(actions.fetchSeverityTypes())
  //   dispatch(actions.fetchCenters())
  // }, [incidentsUIProps.queryParams, dispatch])

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

  const AccessAccordingStatus = () => {
    return;
  };
  //console.log("isAccessForEdit", userAccess)
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
      dataField: "callerName",
      text: "Caller Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "callerPhoneNo",
      text: "Caller PhoneNo",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "location",
      text: "Location",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    // {
    //   dataField: "incidentSeverity.name",
    //   text: "Severity",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    // },
    {
      dataField: "patientName",
      text: "Patient Name",
      sort: false,
      sortCaret: sortCaret,
    },
    // {
    //   dataField: "location",
    //   text: "Location",
    //   sort: false,
    //   sortCaret: sortCaret,
    // },
    {
      dataField: "status",
      text: "Status",
      sort: false,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: columnFormatters.DatetimeColumnFormatter,
      // (cell) => {
      //   let dateObj = cell;
      //   if (typeof cell !== "object") {
      //     dateObj = new Date(cell);
      //   }
      //   return `${("0" + dateObj.getUTCDate()).slice(-2)}/${(
      //     "0" +
      //     (dateObj.getUTCMonth() + 1)
      //   ).slice(-2)}/${dateObj.getUTCFullYear()}`;
      // },
    },
    {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUserDialog: incidentsUIProps.openEditUserDialog,
        openDeleteUserDialog: incidentsUIProps.openDeleteUserDialog,
        openReadUserDialog: incidentsUIProps.openReadUserDialog,
        openTripLogDialog: incidentsUIProps.openTripLogDialog,
        isAccessForEdit: AccessForEdit(),
        isAccessForDelete: AccessForDelete(),
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  //Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: incidentsUIProps.queryParams.pageSize,
    page: incidentsUIProps.queryParams.pageNumber,
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
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  incidentsUIProps.setQueryParams
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
      {/* <BootstrapTable
        wrapperClasses="table-responsive"
        bordered={false}
        classes="table table-head-custom table-vertical-center overflow-hidden"
        bootstrap4
        remote
        keyField="id"
        data={entities === null ? [] : entities}
        columns={columns}
      ></BootstrapTable> */}
    </>
  );
}
