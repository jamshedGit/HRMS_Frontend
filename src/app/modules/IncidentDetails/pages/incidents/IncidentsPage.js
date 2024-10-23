import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { IncidentsUIProvider } from "./IncidentsUIContext";
import { IncidentsEditDialog } from "./incident-edit-dialog/IncidentEditDialog";
import { TripLogDialog } from "./incident-trip-log-dialog/TripLogDialog";
import { IncidentDeleteDialog } from "./incident-delete-dialog/IncidentDeleteDialog";
import { IncidentsCard } from "./incidents-card/IncidentsCard";
import { ToastContainer } from "react-toastify";
import {
  fetchIncident,
  fetchTripLog,
  reInitialIncident,
} from "../../_redux/incidents/incidentActions";
import "react-toastify/dist/ReactToastify.css";

export function IncidentsPage({ history }) {
  const dispatch = useDispatch();
  // const { auth } = useSelector((auth) => auth)
  // console.log("UserManagement, Auth: ", auth)
  // const { userAccess } = auth
  // console.log("UserManagement, userAccess: ", userAccess)
  // const isAdd = userAccess["Settings"]?.find(
  //   (access) => access.resourceId === 5
  // )
  //   ? true
  //   : false
  // const isEdit = userAccess["Settings"]?.find(
  //   (access) => access.resourceId == 4
  // )
  //   ? true
  //   : false
  // console.log("UserManagement, isAdd: ", isAdd)
  // const ForRead = false
  const incidentsUIEvents = {
    newUserButtonClick: () => {
      dispatch(reInitialIncident());
      history.push("/incident-details/read-all-incident-details/new");
    },
    openEditUserDialog: (id) => {
      dispatch(fetchIncident(id));
      history.push(`/incident-details/read-all-incident-details/${id}/edit`);
    },
    openDeleteUserDialog: (id) => {
      history.push(`/incident-details/read-all-incident-details/${id}/delete`);
    },
    openReadUserDialog: (id, isUserRead) => {
      dispatch(fetchIncident(id));
      history.push(`/incident-details/read-all-incident-details/${id}/read`);
    },
    openTripLogDialog: (id) => {
      const queryParams = {
        incidentId: id,
        filter: {
          searchQuery: "",
        },
        sortOrder: "name",
        pageSize: 10,
        pageNumber: 1,
      };
      dispatch(fetchTripLog(queryParams));
      history.push(
        `/incident-details/read-all-incident-details/${id}/trip-log`
      );
    },
  };
  return (
    <IncidentsUIProvider incidentsUIEvents={incidentsUIEvents}>
      <Route exact path="/incident-details/read-all-incident-details/new">
        {({ history, match }) => (
          <IncidentsEditDialog
            show={match != null}
            newIncident={true}
            onHide={() => {
              history.push("/incident-details/read-all-incident-details");
            }}
          />
        )}
      </Route>
      <Route path="/incident-details/read-all-incident-details/:id/edit">
        {({ history, match }) => (
          <IncidentsEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/incident-details/read-all-incident-details");
            }}
          />
        )}
      </Route>
      <Route path="/incident-details/read-all-incident-details/:id/read">
        {({ history, match }) => (
          <IncidentsEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/incident-details/read-all-incident-details");
            }}
          />
        )}
      </Route>
      <Route path="/incident-details/read-all-incident-details/:id/delete">
        {({ history, match }) => (
          <IncidentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/incident-details/read-all-incident-details");
            }}
          />
        )}
      </Route>
      <Route path="/incident-details/read-all-incident-details/:id/trip-log">
        {({ history, match }) => (
          <TripLogDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/incident-details/read-all-incident-details");
            }}
          />
        )}
      </Route>
      {/* {isAdd && (
        <Route exact path="/list/new">
          {({ history, match }) => (
            <IncidentsEditDialog
              show={match != null}
              onHide={() => {
                history.push("/list")
              }}
            />
          )}
        </Route>
      )}
      {isEdit && (
        <Route exact path="/list/edit">
          {({ history, match }) => (
            <IncidentsEditDialog
              show={match != null}
              onHide={() => {
                history.push("/list")
              }}
            />
          )}
        </Route>
      )} */}
      <IncidentsCard />
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
    </IncidentsUIProvider>
  );
}
