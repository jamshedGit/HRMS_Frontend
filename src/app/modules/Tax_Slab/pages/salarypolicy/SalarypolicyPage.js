import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SalarypolicyUIProvider } from "./SalarypolicyUIContext";
import { SalarypolicyEditDialog } from "./salarypolicy-edit-dialog/SalarypolicyEditDialog";
import { SalarypolicyDeleteDialog } from "./salarypolicy-delete-dialog/SalarypolicyDeleteDialog";

import { SalarypolicyCard } from "./salarypolicy-card/SalarypolicyCard";
import { fetchAllCountry } from "../../../../../_metronic/redux/dashboardActions";
import {} from "../../_redux/redux-Actions";



export function SalarypolicyPage({ history }) {

  console.log("tax_slab page")
  const dispatch = useDispatch();
  const SalarypolicyUIEvents = {
    newSalarypolicyButtonClick: () => {
      dispatch(fetchAllCountry());

      history.push("/tax_slab/read-all-tax-slab/new");
    },
    openEditSalarypolicyDialog: (id) => {
      dispatch(fetchAllCountry());

      history.push(`/salarypolicy/read-all-salarypolicy/${id}/edit`);
    },
    openDeleteSalarypolicyDialog: (id, status) => {
      history.push(`/salarypolicy/read-all-salarypolicy/${id}/${status}/delete`);
    },
    openActiveSalarypolicyDialog: (id) => {
      history.push(`/salarypolicy/read-all-salarypolicy/${id}/active`);
    },
    openReadSalarypolicyDialog: (id, isUserRead) => {
      
      
      history.push(`/salarypolicy/read-all-salarypolicy/${id}/read`);
    },
  };
  return (

    
    <SalarypolicyUIProvider SalarypolicyUIEvents={SalarypolicyUIEvents}>
      <Route exact path="/tax_slab/read-all-tax-slab/new">
        {({ history, match }) => (
          <SalarypolicyEditDialog
            show={match != null}
            onHide={() => {
              history.push("/tax_slab/read-all-tax-slab");
            }}
          />
        )}
      </Route>
      <Route path="/tax_slab/read-all-tax-slab/:id/edit">
        {({ history, match }) => (
          <SalarypolicyEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tax_slab/read-all-tax-slab");
            }}
          />
        )}
      </Route>
      <Route path="/tax_slab/read-all-tax-slab/:id/read">
        {({ history, match }) => (
          <SalarypolicyEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/tax_slab/read-all-tax-slab");
            }}
          />
        )}
      </Route>
      <Route path="/tax_slab/read-all-tax-slab/:id/:status/delete">
        {({ history, match }) => (
          <SalarypolicyDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/tax_slab/read-all-tax-slab");
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
    </SalarypolicyUIProvider>
  );
}
