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

export function LoanType({ history }) {
  const dispatch = useDispatch();
  const BanksUIEvents = {
    newBankButtonClick: () => {
     
      history.push("/loan_type/read-all-loan-type/new");
    },
    openEditBankDialog: (id) => {
    
      history.push(`/loan_type/read-all-loan-type/${id}/edit`);
    },
    openDeleteBankDialog: (id, status) => {
      history.push(`/loan_type/read-all-loan-type/${id}/${status}/delete`);
    },
    openActiveBankDialog: (id) => {
      history.push(`/loan_type/read-all-loan-type/${id}/active`);
    },
    openReadBankDialog: (id, isUserRead) => {
      history.push(`/loan_type/read-all-loan-type/${id}/read`);
    },
  };
  return (
    
    <BanksUIProvider BanksUIEvents={BanksUIEvents}>
      <Route exact path="/loan_type/read-all-loan-type/new">
        {({ history, match }) => (
          <BankEditDialog
            show={match != null}
            onHide={() => {
              history.push("/loan_type/read-all-loan-type");
            }}
          />
        )}
      </Route>
      <Route path="/loan_type/read-all-loan-type/:id/edit">
        {({ history, match }) => (
          <BankEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/loan_type/read-all-loan-type");
            }}
          />
        )}
      </Route>
      <Route path="/loan_type/read-all-loan-type/:id/read">
        {({ history, match }) => (
          <BankEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/loan_type/read-all-loan-type");
            }}
          />
        )}
      </Route>
      <Route path="/loan_type/read-all-loan-type/:id/:status/delete">
        {({ history, match }) => (
          <BankDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/loan_type/read-all-loan-type");
            }}
          />
        )}
      </Route>
      <Route path="/loan_type/read-all-loan-type/:id/active">
        {({ history, match }) => (
          <BankActiveDialog
            show={match != null}
            id={match && match.params.id}
            //status={match && match.params.status}
            onHide={() => {
              history.push("/loan_type/read-all-loan-type");
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