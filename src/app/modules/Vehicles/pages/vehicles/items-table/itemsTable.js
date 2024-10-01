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
import { DatetimeColumnFormatter } from "./column-formatter/genericColumnFormatter";
import * as uiHelpers from "../ItemUIHelpers";
import * as actions from "../../../_redux/vehiclesActions";
import { useItemUIContext } from "../ItemUIContext";
import { Pagination } from "../../../../../../_metronic/_partials/controls";

export function ItemsTable() {
  //Users UI Context
  const itemUIContext = useItemUIContext();

  const itemUIProps = useMemo(() => {
    return {
      openEditCenterDialog: itemUIContext.openEditCenterDialog,
      openDeleteCenterDialog: itemUIContext.openDeleteCenterDialog,
      openActiveDialog: itemUIContext.openActiveDialog,
      openReadCenterDialog: itemUIContext.openReadCenterDialog,
      queryParms: itemUIContext.queryParams,
      setQueryParams: itemUIContext.setQueryParams,
    };
  }, [itemUIContext]);

  const { currentState, userAccess } = useSelector(
    (state) => ({
      currentState: state.vehicles,
      userAccess: state?.auth?.userAccess["Vehicles"],
    }),
    shallowEqual
  );

  // Centers Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(actions.fetchVehicles(itemUIProps.queryParms));
    };
    fetchData();
  }, [itemUIProps.queryParms]);

  // useEffect(() => {
  //   dispatch(actions.fetchCenters());
  //   dispatch(actions.fetchCategory());
  // }, []);

  const isAccessForEdit = userAccess.find(
    (item) => item.componentName === "UpdateVehicle"
  );

  const isAccessForDelete = userAccess.find(
    (item) => item.componentName === "DeleteVehicle"
  );
  const { totalCount, entities, listLoading } = currentState;

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
      dataField: "center.name",
      text: "Center Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    // {
    //   dataField: "name",
    //   text: "Center Name",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    //   style: {
    //     minWidth: "130px",
    //   },
    // },
    {
      dataField: "regNo",
      text: "Reg No",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    {
      dataField: "driver.firstName",
      text: "Driver",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    // {
    //   dataField: "engineCapacity",
    //   text: "Engine Capacity",
    //   sort: false,
    //   sortCaret: sortCaret,
    //   headerSortingClasses,
    // },

    {
      dataField: "category.name",
      text: "Category",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    {
      dataField: "status",
      text: "Status",
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
      // style: {
      //   minWidth: "130px",
      // },
    },
    // {
    //   dataField: "phNo",
    //   text: "Phone",
    //   sort: false,
    //   sortCaret: sortCaret,
    // },
    // {
    //   dataField: "role.name",
    //   text: "Role",
    //   sort: false,
    //   sortCaret: sortCaret,
    // },
    // {
    //   dataField: "center.name",
    //   text: "Center",
    //   sort: false,
    //   sortCaret: sortCaret,
    // },
    {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditCenterDialog: itemUIProps.openEditCenterDialog,
        openDeleteCenterDialog: itemUIProps.openDeleteCenterDialog,
        openActiveDialog: itemUIProps.openActiveDialog,
        openReadCenterDialog: itemUIProps.openReadCenterDialog,
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
    sizePerPage: itemUIProps.queryParms.pageSize,
    page: itemUIProps.queryParms.pageNumber,
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
                // classes="table table-head-custom table-vertical-center overflow-hidden"
                // bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                // defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  itemUIProps.setQueryParams
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
    </>
  );
}
