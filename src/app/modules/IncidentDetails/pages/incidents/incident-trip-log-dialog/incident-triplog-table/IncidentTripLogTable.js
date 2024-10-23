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

export function IncidentTripLogTable({ vehiclesForCenter, totalCount }) {
  const [isFetching, setIsFetching] = useState(true);
  //console.log("Center vEHICLES", props.vehiclesForCenter.ro)
  //Users UI Context
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

  // console.log(
  //   "currentStatecenters",
  //   currentStatecenters.centers.vehiclesForCenter.rows
  // )
  // if (currentStatecenters.vehiclesForCenter) {
  //   var entities = currentStatecenters.vehiclesForCenter.rows
  //   var totalCount = currentStatecenters.vehiclesForCenter.totalResults
  //   var listLoading = currentStatecenters.listLoading
  // }

  // console.log("entities", entities)
  // Centers Redux state

  // useCallback(() => {

  // })
  // const { entities, totalCount, userAccess } = useSelector(
  //   (state) => ({
  //     entities: state.centers?.vehiclesForCenter,
  //     totalCount: state.centers.vehiclesForCenter,
  //     userAccess: state.auth.userAccess.Users,
  //   }),
  //   shallowEqual
  // )

  //console.log("props", vehiclesForCenter, totalCount)
  // const dispatch = useDispatch()
  //dispatch(actions.fetchVehicles(centersUIProps.queryParms))
  // useEffect(() => {
  //   // if(token) dispatch(actions.fetchVehicles({token}))
  //   // setTimeout(function() {
  //   //   //console.log("Delayed for 5 second.")
  //   //   dispatch(actions.fetchVehicles(centersUIProps.queryParms))
  //   //   setIsFetching(false)
  //   // }, 3000)
  //   // dispatch(actions.fetchVehicles(centersUIProps.queryParms))
  // }, [dispatch])
  // if (entities !== null) {
  //   var finalentities = entities.rows
  // }
  // console.log("props", finalentities)

  // const useCenterVehicles = () => {
  //   const terminology = useSelector((state) => state.centers.vehiclesForCenter)

  //   return terminology
  // }

  // const { terminology } = useCenterVehicles()

  //console.log("entities", terminology)
  // console.log(
  //   "entities",
  //   setTimeout(function() {
  //     return entities.limit
  //   }, 3000)
  // )
  //console.log("userAccess", userAccess, "Current State", currentState)
  // const isAccessForEdit = userAccess.find(
  //   (item) => item.componentName === "UpdateUser"
  // )

  // const isAccessForDelete = userAccess.find(
  //   (item) => item.componentName === "DeleteUser"
  // )
  // console.log("currentStatecenters", currentStatecenters.vehiclesForCenter)
  // const entities = currentStatecenters.vehiclesForCenter
  // const totalCount = currentStatecenters.vehiclesForCenter.totalResults
  // const listLoading = currentStatecenters.listLoading

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

  return (
    <>
      <h4>Registered Vehicles</h4>
      <CenterVehiclesFilter />
      {/* <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              // isLoading={listLoading}
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
                onTableChange={getHandlerTableChange(
                  centersUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={vehiclesForCenter} />
                <NoRecordsFoundMessage entities={vehiclesForCenter} />
              </BootstrapTable>
            </Pagination>
          )
        }}
      </PaginationProvider> */}
    </>
  );
}
