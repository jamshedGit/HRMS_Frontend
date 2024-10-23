import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CenterEditForm } from "./CenterEditForm";
import { CenterEditDialogHeader } from "./CenterEditDialogHeader";
import { useCentersUIContext } from "../CentersUIContext";
import * as actions from "../../../_redux/centers/centersActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllCity } from "../../../../../../_metronic/redux/dashboardActions";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

export function CenterEditDialog({ id, show, isNew, onHide, userForRead }) {
  const title = "CenterEditDialog";
  const classes = useStyles();
  const [isForEdit, setIsForEdit] = useState();
  const centersUIContext = useCentersUIContext();
  const centersUIProps = useMemo(() => {
    return {
      initCenter: centersUIContext.initCenter,
      queryParams: centersUIContext.queryParams,
      secondQueryParams: centersUIContext.secondQueryParams,
    };
  }, [centersUIContext]);

  const dispatch = useDispatch();
  const {
    centerForEdit,
    actionLoading,
    roles,
    centers,
    isuserForRead,
    vehiclesForCenter,
    totalCount,
  } = useSelector(
    (state) => ({
      centerForEdit: state.centers.centerForEdit,
      actionLoading: state.centers.actionsLoading,
      roles: state.users.roles,
      centers: state.users.centers,
      isuserForRead: state.users.userForRead,
      vehiclesForCenter: state.centers.vehiclesForCenter?.rows,
      totalCount: state.centers.vehiclesForCenter?.totalResults,
    }),
    shallowEqual
  );

  //console.log("centerForEdit", centerForEdit);

  useEffect(() => {
    if (id) {
      //dispatch(actions.fetchCenter(id));
      dispatch(
        actions.fetchVehicles({
          ...centersUIProps.secondQueryParams,
          centerId: id,
        })
      );
    }
  }, [id, centersUIProps.secondQueryParams]);

  // useEffect(() => {
  //   if (id) {
  //     if (centerForEdit || userForRead) {
  //       // console.log("centerForEdit", centerForEdit);
  //       dispatch(actions.fetchAllCity(centerForEdit.countryId));
  //     }
  //   }
  // }, [id, centerForEdit]);
  // console.log("listLoading", listLoading);
  const saveCenter = (center) => {
    console.log("center", center);
    if (!id) {
      dispatch(actions.createCenter(center)).then((res) => {
        onHide();
      });
    } else {
      const centerUpdatedFields = {
        id: center.id,
        name: center.name,
        phoneNo: center.phoneNo,
        // location: center.location,
        // longitude: center.longitude,
        // latitude: center.latitude,
        countryId: center.countryId,
        cityId: center.cityId,
      };

      dispatch(actions.updateCenter(centerUpdatedFields));
      onHide();
    }
  };

  return (
    <Modal
      size="xl"
      dialogClassName="modal-90w"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CenterEditDialogHeader id={id} isUserForRead={userForRead} />
      <CenterEditForm
        saveCenter={saveCenter}
        center={centerForEdit || centersUIProps.initCenter}
        onHide={onHide}
        roles={roles}
        centers={centers}
        isUserForRead={userForRead}
        vehiclesForCenter={vehiclesForCenter}
        totalCount={totalCount}
      />
      {/* {actionLoading ? (
        <>
          <div className={classes.root}>
            <CircularProgress />
          </div>
        </>
      ) : (
        <>
          <CenterEditForm
            saveCenter={saveCenter}
            center={centerForEdit || centersUIProps.initCenter}
            onHide={onHide}
            roles={roles}
            centers={centers}
            isUserForRead={userForRead}
            vehiclesForCenter={vehiclesForCenter}
            totalCount={totalCount}
            id={id}
          />
        </>
      )} */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Modal>
  );
}
