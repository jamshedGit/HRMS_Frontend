import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BanksUIProvider } from "./SalarypolicyUIContext";
import { SalarypolicyEditDialog } from "./salarypolicy-edit-dialog/SalarypolicyEditDialog";
import { SalarypolicyDeleteDialog } from "./salarypolicy-delete-dialog/SalarypolicyDeleteDialog";
import { SalarypolicyActiveDialog } from "./salarypolicy-active-dialog/SalarypolicyActiveDialog";
import { SalarypolicyCard } from "./salarypolicy-card/SalarypolicyCard";
import { fetchAllCountry } from "../../../../../_metronic/redux/dashboardActions";
import {
  fetchUserStatusTypes,
  fetchRoles,
  fetchCenters,
} from "../../_redux/salarypolicyActions";


// dispatch(actions.fetchRoles());
//     dispatch(actions.fetchCenters());

export function SalarypolicyPage({ history }) {
  const dispatch = useDispatch();
  const BanksUIEvents = {
    newBankButtonClick: () => {
      dispatch(fetchAllCountry());
      dispatch(fetchRoles());
      dispatch(fetchCenters());
      dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push("/salarypolicy/read-all-salarypolicy/new");
    },
    openEditBankDialog: (id) => {
      dispatch(fetchAllCountry());
      dispatch(fetchRoles());
      dispatch(fetchCenters());
      dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push(`/salarypolicy/read-all-salarypolicy/${id}/edit`);
    },
    openDeleteBankDialog: (id, status) => {
      history.push(`/salarypolicy/read-all-salarypolicy/${id}/${status}/delete`);
    },
    openActiveBankDialog: (id) => {
      history.push(`/salarypolicy/read-all-salarypolicy/${id}/active`);
    },
    openReadBankDialog: (id, isUserRead) => {
      
      // dispatch(fetchAllCountry());
      // dispatch(fetchRoles());
      // dispatch(fetchCenters());
      // dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push(`/salarypolicy/read-all-salarypolicy/${id}/read`);
    },
  };
  return (
    
    <BanksUIProvider BanksUIEvents={BanksUIEvents}>
      <Route exact path="/salarypolicy/read-all-salarypolicy/new">
        {({ history, match }) => (
          <SalarypolicyEditDialog
            show={match != null}
            onHide={() => {
              history.push("/salarypolicy/read-all-salarypolicy");
            }}
          />
        )}
      </Route>
      <Route path="/salarypolicy/read-all-salarypolicy/:id/edit">
        {({ history, match }) => (
          <SalarypolicyEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/salarypolicy/read-all-salarypolicy");
            }}
          />
        )}
      </Route>
      <Route path="/salarypolicy/read-all-salarypolicy/:id/read">
        {({ history, match }) => (
          <SalarypolicyEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/salarypolicy/read-all-salarypolicy");
            }}
          />
        )}
      </Route>
      <Route path="/salarypolicy/read-all-salarypolicy/:id/:status/delete">
        {({ history, match }) => (
          <SalarypolicyDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/salarypolicy/read-all-salarypolicy");
            }}
          />
        )}
      </Route>
      <Route path="/salarypolicy/read-all-salarypolicy/:id/active">
        {({ history, match }) => (
          <SalarypolicyActiveDialog
            show={match != null}
            id={match && match.params.id}
            //status={match && match.params.status}
            onHide={() => {
              history.push("/salarypolicy/read-all-salarypolicy");
            }}
          />
        )}
      </Route>
      <SalarypolicyCard />
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
    </BanksUIProvider>
  );
}
