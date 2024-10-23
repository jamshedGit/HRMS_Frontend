import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter";
import { CreatedColumnFormatter } from "./column-formatter/CreatedColumnFormatter";
import { DatetimeColumnFormatter } from "./column-formatter/CreatedColumnFormatter";
import * as uiHelpers from "../CentersUIHelpers";
import * as actions from "../../../_redux/centers/centersActions";
import { useCentersUIContext } from "../CentersUIContext";
import { Pagination } from "../../../../../../_metronic/_partials/controls";

export function CentersTable() {
  //Users UI Context
  const centersUIContext = useCentersUIContext();
  //  console.log("centersUIContext in center", centersUIContext);
  const centersUIProps = useMemo(() => {
    return {
      openEditCenterDialog: centersUIContext.openEditCenterDialog,
      openDeleteCenterDialog: centersUIContext.openDeleteCenterDialog,
      openActiveCenterDialog: centersUIContext.openActiveCenterDialog,
      openReadCenterDialog: centersUIContext.openReadCenterDialog,
      queryParms: centersUIContext.queryParams,
      setQueryParams: centersUIContext.setQueryParams,
    };
  }, [centersUIContext]);

  const { currentStatecenters, userAccess } = useSelector(
    (state) => ({
      currentStatecenters: state.centers,
      userAccess: state?.auth?.userAccess?.Centers,
      //userAccess: state.auth.userAccess.Users,
    }),
    shallowEqual
  );
  // Centers Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(actions.fetchCenters(centersUIProps.queryParms));
    }
    fetchData();
  }, [centersUIProps.queryParms]);

  const isAccessForEdit = userAccess.find(
    (item) => item.componentName === "UpdateCenter"
  );

  const isAccessForDelete = userAccess.find(
    (item) => item.componentName === "DeleteCenter"
  );
  //console.log("currentStatecenters", currentStatecenters);
  const { totalCount, entities, listLoading } = currentStatecenters;
  // console.log("currentStatecenters", currentStatecenters)

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
      dataField: "name",
      text: "Center Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    {
      dataField: "country.name",
      text: "Country",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    {
      dataField: "city.name",
      text: "City",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    // {
    //   dataField: "location",
    //   text: "Location",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    //   style: {
    //     minWidth: "130px",
    //   },
    // },
    {
      dataField: "phoneNo",
      text: "Phone",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
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
        openEditCenterDialog: centersUIProps.openEditCenterDialog,
        openDeleteCenterDialog: centersUIProps.openDeleteCenterDialog,
        openActiveCenterDialog: centersUIProps.openActiveCenterDialog,
        openReadCenterDialog: centersUIProps.openReadCenterDialog,
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
    sizePerPage: centersUIProps.queryParms.pageSize,
    page: centersUIProps.queryParms.pageNumber,
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
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  centersUIProps.setQueryParams
                )}
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
