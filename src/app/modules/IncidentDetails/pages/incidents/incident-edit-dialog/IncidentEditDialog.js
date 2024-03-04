import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IncidentEditForm } from "./IncidentEditForm";
import { IncidentEditDialogHeader } from "./IncidentEditDialogHeader";
import { useIncidentsUIContext } from "../IncidentsUIContext";
import * as actions from "../../../_redux/incidents/incidentActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export function IncidentsEditDialog({ id, show, onHide, userForRead }) {
  const title = "UserEditDialog";
  const classes = useStyles();
  const [centerId, setCenter] = useState("");
  const [loading, setLoading] = useState(false);
  const incidentsUIContext = useIncidentsUIContext();
  const incidentsUIProps = useMemo(() => {
    return {
      initIncident: incidentsUIContext.initIncident,
      queryParams: incidentsUIContext.queryParams,
    };
  }, [incidentsUIContext]);

  const dispatch = useDispatch();
  const {
    actionsLoading,
    incidentForEdit,
    isuserForRead,
    IncidentType,
    incidentSeverity,
    centers,
    vehicleByCenterId,
    vehiclesForDropdown,
    getState,
  } = useSelector(
    (state) => ({
      actionsLoading: state.incidentDetails.actionsLoading,
      incidentForEdit: state.incidentDetails.incidentForEdit,
      isuserForRead: state.incidentDetails.userForRead,
      IncidentType: state.incidentDetails.incidentTypes,
      incidentSeverity: state.incidentDetails.incidentSeverity,
      centers: state.incidentDetails.centers,
      vehicleByCenterId: state.incidentDetails.vehicleByCenterId,
      vehiclesForDropdown: state.incidentDetails.vehiclesForDropdown,
      getState: state,
    }),
    shallowEqual
  );
  console.log("incident orignal data", vehiclesForDropdown);
  if (incidentForEdit) {
    var NewIncidentForEdit = {
      ...incidentForEdit?.incident,
      vehicleId: incidentForEdit?.vehicleId,
      centerId: incidentForEdit?.centerId,
      oldVehicleId: incidentForEdit?.oldVehicleId,
      // incidentSeverityId: incidentForEdit?.incident?.incidentSeverity?.id,
      // incidentTypeId: incidentForEdit?.incident?.incidentType?.id,
    };
  }
  // Enable Loading
  const enableLoading = () => {
    setLoading(true);
  };
  // disable Loading
  const disabledLoading = () => {
    setLoading(false);
  };
  // console.log("NewIncidentForEdit for edit", NewIncidentForEdit);
  // const NewIncidentForEdit = {
  //   ...incidentForEdit?.incident,
  //   vehicleId: incidentForEdit?.vehicleId,
  //   centerId: incidentForEdit?.centerId,
  // };
  // console.log("centerId", centerId);
  useEffect(() => {
    // dispatch(actions.fetchIncidentTypes())
    // dispatch(actions.fetchSeverityTypes())
    // dispatch(actions.fetchCenters())
    // dispatch(actions.fetchIncidents(incidentsUIProps.queryParams))
    // // console.log("centerId", centerId)
    // await dispatch(
    //   actions.fetchVehicleById({
    //     ...incidentsUIProps.queryParams,
    //     centerId: centerId,
    //   })
    // )
    // if (!id) {
    // } else {
    //   dispatch(actions.fetchIncident(id))
    //   if (incidentForEdit) {
    //     dispatch(actions.fetchVehicleById(incidentForEdit.centerId))
    //   }
    // }
  }, []);
  // console.log("incidentForEdit", incidentForEdit)
  // if (incidentForEdit) {
  //   return
  // }

  //Create New object for Edit Incident

  // const getIncident = incidentForEdit.incident
  // const getCenterId = incidentForEdit.centerId
  // const getSelectedVehicles = incidentForEdit.vehicleId
  // var newIncidentForEdit = {
  //   ...getIncident,
  //   ...getCenterId,
  //   ...getSelectedVehicles,
  // }

  // dispatch(actions.fetchVehicleById(parseInt(centerId)))
  //console.log("newIncidentForEdit", newIncidentForEdit)

  const saveIncident = (incident) => {
    // console.log("updated data", incident);
    if (!id) {
      const incidentUpdate = { ...incident };
      enableLoading();
      dispatch(actions.createIncident(incident)).then((res) => {
        disabledLoading();
        onHide();
      });
    } else {
      //console.log("i'm in update")
      const {
        isActive,
        slug,
        createdBy,
        updatedBy,
        createdAt,
        updatedAt,
        incidentSeverity,
        center,
        incidentType,
        vehicle,
        vehicleId,
        ...rest
      } = incident;

      // console.log("...rest::", rest);
      // const userUpdatedFields = {
      //   id: saveIncident.id,
      //   email: saveIncident.email,
      //   phNo: saveIncident.phNo,
      //   cnic: saveIncident.cnic,
      //   password: saveIncident.password,
      //   firstName: saveIncident.firstName,
      //   lastName: saveIncident.lastName,
      //   roleId: saveIncident.roleId,
      // }
      console.log("newVehicleId: ", vehicleId);
      enableLoading();

      // Converting all strings to number
      let vehicleidsConversionToNumber;
      if (vehicleId.length && vehicleId[0].id) {
        vehicleidsConversionToNumber = vehicleId.map(function(x) {
          return parseInt(x.id, 10);
        });
      } else {
        vehicleidsConversionToNumber = vehicleId.map(function(x) {
          return parseInt(x, 10);
        });
      }
      console.log("vehicleidsConversionToNumber", vehicleidsConversionToNumber);
      dispatch(
        actions.updateIncident({
          ...rest,
          centerId: parseInt(rest.centerId),
          id: parseInt(id),
          newVehicleId:
            vehicleidsConversionToNumber != null
              ? [...vehicleidsConversionToNumber, ...rest.oldVehicleId]
              : [],
        })
      ).then((res) => {
        disabledLoading();
        onHide();
      });
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {actionsLoading ? (
        <>
          <div className={classes.root}>
            <CircularProgress />
          </div>
        </>
      ) : (
        <>
          <IncidentEditDialogHeader id={id} isUserForRead={userForRead} />
          <IncidentEditForm
            saveIncident={saveIncident}
            incident={NewIncidentForEdit || incidentsUIProps?.initIncident}
            IncidentType={IncidentType}
            incidentSeverityOption={incidentSeverity}
            centers={centers}
            vehicleByCenterId={vehicleByCenterId}
            vehiclesForDropdown={vehiclesForDropdown}
            onHide={onHide}
            isUserForRead={userForRead}
            setCenter={setCenter}
            loading={loading}
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
