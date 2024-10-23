import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BanksUIProvider } from "./BanksUIContext";
import { BankEditDialog } from "./bank-edit-dialog/BankEditDialog";
import { BankDeleteDialog } from "./bank-delete-dialog/BankDeleteDialog";
import { BankActiveDialog } from "./bank-active-dialog/BankActiveDialog";
import { BanksCard } from "./bank-card/BanksCard";
import { fetchAllCountry } from "../../../../../_metronic/redux/dashboardActions";
import {
  fetchUserStatusTypes,
  fetchRoles,
  fetchCenters,
} from "../../_redux/bankActions";


// dispatch(actions.fetchRoles());
//     dispatch(actions.fetchCenters());

export function ExperiencePage({ history }) {
  const dispatch = useDispatch();
  const BanksUIEvents = {
    newBankButtonClick: () => {
      dispatch(fetchAllCountry());
      dispatch(fetchRoles());
      dispatch(fetchCenters());
      dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push("/experience/read-all-experience/new");
    },
    openEditBankDialog: (id) => {
      dispatch(fetchAllCountry());
      dispatch(fetchRoles());
      dispatch(fetchCenters());
      dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push(`/experience/read-all-experience/${id}/edit`);
    },
    openDeleteBankDialog: (id, status) => {
      history.push(`/experience/read-all-experience/${id}/${status}/delete`);
    },
    openActiveBankDialog: (id) => {
      history.push(`/experience/read-all-experience/${id}/active`);
    },
    openReadBankDialog: (id, isUserRead) => {
      
      // dispatch(fetchAllCountry());
      // dispatch(fetchRoles());
      // dispatch(fetchCenters());
      // dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push(`/experience/read-all-experience/${id}/read`);
    },
  };
  return (
    
    <BanksUIProvider BanksUIEvents={BanksUIEvents}>
      <Route exact path="/experience/read-all-experience/new">
        {({ history, match }) => (
          <BankEditDialog
            show={match != null}
            onHide={() => {
              history.push("/experience/read-all-experience");
            }}
          />
        )}
      </Route>
      <Route path="/experience/read-all-experience/:id/edit">
        {({ history, match }) => (
          <BankEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/experience/read-all-experience");
            }}
          />
        )}
      </Route>
      <Route path="/experience/read-all-experience/:id/read">
        {({ history, match }) => (
          <BankEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/experience/read-all-experience");
            }}
          />
        )}
      </Route>
      <Route path="/experience/read-all-experience/:id/:status/delete">
        {({ history, match }) => (
          <BankDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/experience/read-all-experience");
            }}
          />
        )}
      </Route>
      <Route path="/experience/read-all-experience/:id/active">
        {({ history, match }) => (
          <BankActiveDialog
            show={match != null}
            id={match && match.params.id}
            //status={match && match.params.status}
            onHide={() => {
              history.push("/experience/read-all-experience");
            }}
          />
        )}
      </Route>
      <BanksCard />
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
