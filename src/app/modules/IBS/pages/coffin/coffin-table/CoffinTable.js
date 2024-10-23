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
import * as uiHelpers from "../CoffinUIHelpers";
import * as actions from "../../../_redux/coffin/reduxActions";
import { useModuleUIContext } from "../CoffinUIContext";
import { Pagination } from "../../../../../../_metronic/_partials/controls";

export function CoffinTable() {
  //Users UI Context
  const moduleUIContext = useModuleUIContext();

  const moduleUIProps = useMemo(() => {
    return {
      openEditDialog: moduleUIContext.openEditDialog,
      openDeleteDialog: moduleUIContext.openDeleteDialog,
      openActiveDialog: moduleUIContext.openActiveDialog,
      openReadDialog: moduleUIContext.openReadDialog,
      queryParms: moduleUIContext.queryParams,
      setQueryParams: moduleUIContext.setQueryParams,
    };
  }, [moduleUIContext]);

  const { userAccess, coffin } = useSelector(
    (state) => ({
      userAccess: state?.auth?.userAccess?.IBS,
      coffin: state.coffin,
    }),
    shallowEqual
  );

  // Centers Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(actions.fetchIbs(moduleUIProps.queryParms));
    }
    fetchData();
  }, [moduleUIProps.queryParms]);

  const isAccessForEdit = userAccess?.find(
    (item) => item.componentName === "UpdateCoffinform"
  );

  const isAccessForDelete = userAccess?.find(
    (item) => item.componentName === "DeleteCoffinform"
  );

  const { totalCount, entities, listLoading } = coffin;
  //console.log("entities", entities);

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
      dataField: "fullNameOfTheDeceased",
      text: "Deceased Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
        maxWidth: "100px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    {
      dataField: "fatherNameOfTheDeceased",
      text: "Father Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
        maxWidth: "100px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
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
        maxWidth: "100px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    {
      dataField: "dateTime",
      text: "Date",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: DatetimeColumnFormatter,
      style: {
        minWidth: "130px",
      },
    },

    {
      dataField: "status.name",
      text: "Status",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
        maxWidth: "100px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
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
        openEditDialog: moduleUIProps.openEditDialog,
        openDeleteDialog: moduleUIProps.openDeleteDialog,
        openActiveDialog: moduleUIProps.openActiveDialog,
        openReadDialog: moduleUIProps.openReadDialog,
        isAccessForEdit: isAccessForEdit?.isAccess,
        isAccessForDelete: isAccessForDelete?.isAccess,
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
    sizePerPage: moduleUIProps.queryParms.pageSize,
    page: moduleUIProps.queryParms.pageNumber,
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
                  moduleUIProps.setQueryParams
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
