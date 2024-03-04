import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { MortuaryUIProvider } from "./CoffinUIContext";
import { CoffinEditDialog } from "./coffin-edit-dialog/CoffinEditDialog";
import { CoffinDeleteDialog } from "./coffin-delete-dialog/CoffinDeleteDialog";
import { CoffinActiveDialog } from "./coffin-active-dialog/CoffinActiveDialog";
import { CoffinCard } from "./coffin-card/CoffinCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../_redux/coffin/reduxActions";
import { fetchUserStatusTypes } from "../../../UserMangement/_redux/usersActions";

export function CoffinPage({ history }) {
  const dispatch = useDispatch();

  const moduleUIEvents = {
    addNewButtonClick: () => {
      dispatch(fetchUserStatusTypes({ filter: { cf: true } }));
      history.push("/ibs/read-all-coffinforms/new");
    },
    openEditDialog: (id) => {
      dispatch(actions.fetchInfoById(id));
      dispatch(fetchUserStatusTypes({ filter: { cf: true } }));
      history.push(`/ibs/read-all-coffinforms/${id}/edit`);
    },
    openDeleteDialog: (id, status) => {
      history.push(`/ibs/read-all-coffinforms/${id}/${status}/delete`);
    },
    openActiveDialog: (id) => {
      history.push(`/ibs/read-all-coffinforms/${id}/active`);
    },
    openReadDialog: (id, isUserRead) => {
      dispatch(actions.fetchInfoById(id));
      dispatch(fetchUserStatusTypes({ filter: { cf: true } }));
      history.push(`/ibs/read-all-coffinforms/${id}/read`);
    },
  };
  return (
    <MortuaryUIProvider moduleUIEvents={moduleUIEvents}>
      <Route exact path="/ibs/read-all-coffinforms/new">
        {({ history, match }) => (
          <CoffinEditDialog
            show={match != null}
            onHide={() => {
              history.push("/ibs/read-all-coffinforms");
            }}
            isNew={true}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-coffinforms/:id/edit">
        {({ history, match }) => (
          <CoffinEditDialog
            show={match != null}
            onHide={() => {
              history.push("/ibs/read-all-coffinforms");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-coffinforms/:id/read">
        {({ history, match }) => (
          <CoffinEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/ibs/read-all-coffinforms");
            }}
          />
        )}
      </Route>

      <Route path="/ibs/read-all-coffinforms/:id/:status/delete">
        {({ history, match }) => (
          <CoffinDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/ibs/read-all-coffinforms");
            }}
          />
        )}
      </Route>
      <Route path="/ibs/read-all-coffinforms/:id/active">
        {({ history, match }) => (
          <CoffinActiveDialog
            show={match != null}
            id={match && match.params.id}
            //status={match && match.params.status}
            onHide={() => {
              history.push("/ibs/read-all-coffinforms");
            }}
          />
        )}
      </Route>
      <CoffinCard />
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
    </MortuaryUIProvider>
  );
}
