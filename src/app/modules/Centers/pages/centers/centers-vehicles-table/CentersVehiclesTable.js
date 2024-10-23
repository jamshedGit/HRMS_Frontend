import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import * as uiHelpers from "../CentersUIHelpers";
import * as actions from "../../../_redux/centers/centersActions";
import { useCentersUIContext } from "../CentersUIContext";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { Spinner, Button, ButtonToolbar } from "react-bootstrap";
import { CenterVehiclesFilter } from "./center-vehicle-filter/CenterVehiclesFilter";
import { fetchVehicle } from "../../../../Vehicles/_redux/vehiclesActions";

export function CentersVehiclesTable({ vehiclesForCenter, totalCount }) {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true);
  const centersUIContext = useCentersUIContext();

  const centersUIProps = useMemo(() => {
    return {
      openEditCenterDialog: centersUIContext.openEditCenterDialog,
      openDeleteCenterDialog: centersUIContext.openDeleteCenterDialog,
      openReadCenterDialog: centersUIContext.openReadCenterDialog,
      queryParms: centersUIContext.secondQueryParams,
      setQueryParams: centersUIContext.setSecondQueryParams,
    };
  }, [centersUIContext]);

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
      dataField: "driver.firstName",
      text: "Driver Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "driver.phNo",
      text: "Driver Phone Number",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "name",
      text: "Vehicle Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "regNo",
      text: "Reg No",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "make",
      text: "Make",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "color",
      text: "Color",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "fuelType",
      text: "Fuel Type",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "isActive",
      text: "isActive",
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== "object") {
          dateObj = new Date(cell);
        }
        return `${("0" + dateObj.getUTCDate()).slice(-2)}/${(
          "0" +
          (dateObj.getUTCMonth() + 1)
        ).slice(-2)}/${dateObj.getUTCFullYear()}`;
      },
    },

    // {
    //   dataField: "action",
    //   text: "Actions",
    //   isDummyField: true,
    //   formatter: ActionsColumnFormatter,
    //   formatExtraData: {
    //     openEditCenterDialog: centersUIProps.openEditCenterDialog,
    //     openDeleteCenterDialog: centersUIProps.openDeleteCenterDialog,
    //     openReadCenterDialog: centersUIProps.openReadCenterDialog,
    //     // isAccessForEdit: isAccessForEdit ? isAccessForEdit.isAccess : false,
    //     // isAccessForDelete: isAccessForDelete
    //     //   ? isAccessForDelete.isAccess
    //     //   : false,
    //   },
    //   classes: "text-right pr-0",
    //   headerClasses: "text-right pr-3",
    //   style: {
    //     minWidth: "100px",
    //   },
    // },
  ];

  //Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount === undefined ? 0 : totalCount,
    sizePerPageList: uiHelpers.sizePerPage,
    sizePerPage: centersUIProps.queryParms.pageSize,
    page: centersUIProps.queryParms.pageNumber,
  };

  const emptyDataMessage = () => {
    return <h6 className="text-center mt-2">No Data to Display</h6>;
  };

  return (
    <>
      <h4>Registered Vehicles</h4>
      <CenterVehiclesFilter />
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              //isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden table-hover"
                bootstrap4
                remote
                keyField="id"
                data={vehiclesForCenter === undefined ? [] : vehiclesForCenter}
                columns={columns}
                // defaultSorted={uiHelpers.defaultSorted}
                noDataIndication={emptyDataMessage}
                onTableChange={getHandlerTableChange(
                  centersUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={vehiclesForCenter} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
