import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { TripLogEditForm } from "./TripLogEditForm";
import { IncidentEditDialogHeader } from "./IncidentEditDialogHeader";
import { useTripLogsUIContext } from "../TripLogsUIContext";
import * as actions from "../../../_redux/triplogs/triplogActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchDashboardVehicles } from "../../../../../../_metronic/redux/dashboardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

export function TripLogEditDialog({
  id,
  show,
  onHide,
  userForRead,
  seletedCity,
  center,
  subCenter,
  setVehicle,
  setSeletecOnDuty,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [seletCity, setSelectCity] = useState({});
  const [seletCenter, setSelectCenter] = useState({});
  const [seletSubcenter, setSelectsubCenter] = useState({});
  const triplogsUIContext = useTripLogsUIContext();
  const [loading, setLoading] = useState(false);
  const [centerId, setCenter] = useState(0);

  useEffect(() => {
    dispatch(actions.fetchTripLog(id));
  }, [id]);

  const triplogsUIProps = useMemo(() => {
    return {
      //initTripLog: triplogsUIContext.initTripLog,
      // queryParams: triplogsUIContext.queryParams,
    };
  }, [triplogsUIContext]);

  const {
    actionsLoading,
    driverTripForEdit,
    isuserForRead,
    getTripLogforEdit,
  } = useSelector(
    (state) => ({
      actionsLoading: state.triplogs.actionsLoading,
      driverTripForEdit: state.triplogs.driverTripForEdit,
      getTripLogforEdit: state.triplogs,
      // isuserForRead: state.incidentDetails.userForRead,
      // IncidentType: state.incidentDetails.incidentTypes,
      // incidentSeverity: state.incidentDetails.incidentSeverity,
      // centers: state.incidentDetails.centers,
      // vehicleByCenterId: state.incidentDetails.vehicleByCenterId,
      // getState: state,
    }),
    shallowEqual
  );

  //console.log("getTripLogforEdit", getTripLogforEdit);
  // const { createdAt } = driverTripForEdit;
  //console.log("createdAt", createdAt);
  const enableLoading = () => {
    setLoading(true);
  };
  const disabledLoading = () => {
    setLoading(false);
  };

  const updateTripLog = (incident) => {
    const { price, finalReading, logBookNo, status, endDateTime } = incident;
    const newObject = {
      subCenterId: seletSubcenter.value,
      price: price.toString(),
      finalReading: finalReading,
      logBookNo: logBookNo,
      status: status,
      id: +id,
      //endDateTime: endDateTime,
    };
    // console.log("newObject", newObject);
    enableLoading();
    dispatch(actions.updateTrip(newObject, disabledLoading, onHide)).then(
      () => {
        var filterObj = {};
        if (seletedCity.value) {
          filterObj.cityId = seletedCity.value;
        }
        if (center) {
          filterObj.centerId = center;
        }
        if (subCenter) {
          filterObj.subCenterId = subCenter;
        }
        dispatch(fetchDashboardVehicles(filterObj));
        setSeletecOnDuty([]);
        // disabledLoading();
        // onHide();
      }
    );

    // if (!id) {
    //   const incidentUpdate = { ...incident };
    //   enableLoading();
    //   dispatch(actions.createIncident(incident)).then((res) => {
    //     onHide();
    //   });
    // } else {
    //   // const {
    //   //   isActive,
    //   //   slug,
    //   //   createdBy,
    //   //   updatedBy,
    //   //   createdAt,
    //   //   updatedAt,
    //   //   endDateTime,
    //   //   initialReading,
    //   //   kiloMeters,
    //   //   centerId,
    //   //   vehicleId,
    //   //   incidentId,
    //   //   center,
    //   //   vehicle,

    //   //   ...rest
    //   // } = incident;

    //   // enableLoading();
    //   // delete rest.driverId;
    //   // dispatch(actions.updateTrip({ ...rest, id })).then((res) => {
    //   //   disabledLoading();
    //   //   onHide();
    //   // });
    // }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {!driverTripForEdit ? (
        <>
          <div className={classes.root}>
            <CircularProgress />
          </div>
        </>
      ) : (
        <>
          <IncidentEditDialogHeader id={id} isUserForRead={userForRead} />
          <TripLogEditForm
            updateTripLog={updateTripLog}
            driverTrip={driverTripForEdit}
            onHide={onHide}
            isUserForRead={userForRead}
            setCenter={setCenter}
            loading={loading}
            setSelectCity={setSelectCity}
            setSelectCenter={setSelectCenter}
            setSelectsubCenter={setSelectsubCenter}
            seletCity={seletCity}
            seletCenter={seletCenter}
            seletSubcenter={seletSubcenter}
          />
        </>
      )}

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
