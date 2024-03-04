import React from "react";
import { Route } from "react-router-dom";
import { TripLogsUIProvider } from "./TripLogsUIContext";
import { TripLogEditDialog } from "./triplog-edit-dialog/TripLogEditDialog";
import { TripLogViewDialog } from "./triplog-view-dialog/TripLogViewDialog";
import { TripLogDeleteDialog } from "./triplog-delete-dialog/TripLogDeleteDialog";
import { TripLogsCard } from "./triplogs-card/TripLogsCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function TriplogPage({ history }) {
  const TripLogsUIEvents = {
    // newUserButtonClick: () => {
    //   history.push("/incident-details/read-all-incident-details/new")
    // },
    openEditUserDialog: (id) => {
      history.push(`/incident-details/read-all-driver-trip-logs/${id}/edit`);
    },
    openDeleteUserDialog: (id) => {
      history.push(`/incident-details/read-all-driver-trip-logs/${id}/delete`);
    },
    openReadUserDialog: (id, isUserRead) => {
      history.push(`/incident-details/read-all-driver-trip-logs/${id}/read`);
    },
  };
  return (
    <TripLogsUIProvider TripLogsUIEvents={TripLogsUIEvents}>
      {/* <Route exact path="/incident-details/read-all-incident-details/new">
        {({ history, match }) => (
          <TripLogEditDialog
            show={match != null}
            onHide={() => {
              history.push("/incident-details/read-all-incident-details")
            }}
          />
        )}
      </Route> */}
      <Route path="/incident-details/read-all-driver-trip-logs/:id/edit">
        {({ history, match }) => (
          <TripLogEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/incident-details/read-all-driver-trip-logs");
            }}
          />
        )}
      </Route>

      <Route path="/incident-details/read-all-driver-trip-logs/:id/read">
        {({ history, match }) => (
          <TripLogViewDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/incident-details/read-all-driver-trip-logs");
            }}
          />
        )}
      </Route>
      <Route path="/incident-details/read-all-driver-trip-logs/:id/delete">
        {({ history, match }) => (
          <TripLogDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/incident-details/read-all-driver-trip-logs");
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
      <TripLogsCard />
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
    </TripLogsUIProvider>
  );
}
