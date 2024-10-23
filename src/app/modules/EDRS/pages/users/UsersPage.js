import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UsersUIProvider } from "./UsersUIContext";
import { UsersEditDialog } from "./users-edit-dialog/UsersEditDialog";
import { UserDeleteDialog } from "./user-delete-dialog/UserDeleteDialog";
import { UserActiveDialog } from "./user-active-dialog/UserActiveDialog";
import { UsersCard } from "./users-card/UsersCard";
import { fetchAllCountry } from "../../../../../_metronic/redux/dashboardActions";
import {
  fetchUserStatusTypes,
  fetchRoles,
  fetchCenters,
} from "../../_redux/usersActions";

// dispatch(actions.fetchRoles());
//     dispatch(actions.fetchCenters());

export function UsersPage({ history }) {
  const dispatch = useDispatch();
  const usersUIEvents = {
    newUserButtonClick: () => {
      dispatch(fetchAllCountry());
      dispatch(fetchRoles());
      dispatch(fetchCenters());
      dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push("/edrs/read-all-receipt/new");
    },
    openEditUserDialog: (id) => {
      dispatch(fetchAllCountry());
      dispatch(fetchRoles());
      dispatch(fetchCenters());
      dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push(`/edrs/read-all-receipt/${id}/edit`);
    },
    openDeleteUserDialog: (id, status) => {
      history.push(`/edrs/read-all-receipt/${id}/${status}/delete`);
    },
    openActiveUserDialog: (id) => {
      history.push(`/edrs/read-all-receipt/${id}/active`);
    },
    openReadUserDialog: (id, isUserRead) => {
      
      dispatch(fetchAllCountry());
      dispatch(fetchRoles());
      dispatch(fetchCenters());
      dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push(`/edrs/read-all-receipt/${id}/read`);
    },
  };
  return (
    
    <UsersUIProvider usersUIEvents={usersUIEvents}>
      <Route exact path="/edrs/read-all-receipt/new">
        {({ history, match }) => (
          <UsersEditDialog
            show={match != null}
            onHide={() => {
              history.push("/edrs/read-all-receipt");
            }}
          />
        )}
      </Route>
      <Route path="/edrs/read-all-receipt/:id/edit">
        {({ history, match }) => (
          <UsersEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/edrs/read-all-receipt");
            }}
          />
        )}
      </Route>
      <Route path="/edrs/read-all-receipt/:id/read">
        {({ history, match }) => (
          <UsersEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/edrs/read-all-receipt");
            }}
          />
        )}
      </Route>
      <Route path="/edrs/read-all-receipt/:id/:status/delete">
        {({ history, match }) => (
          <UserDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/edrs/read-all-receipt");
            }}
          />
        )}
      </Route>
      <Route path="/edrs/read-all-receipt/:id/active">
        {({ history, match }) => (
          <UserActiveDialog
            show={match != null}
            id={match && match.params.id}
            //status={match && match.params.status}
            onHide={() => {
              history.push("/edrs/read-all-receipt");
            }}
          />
        )}
      </Route>
      <UsersCard />
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
    </UsersUIProvider>
  );
}
