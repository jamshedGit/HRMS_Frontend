import React from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormUIProvider } from "./FormUIContext";
import { FormDeleteDialog } from "./form-delete-dialog/FormDeleteDialog";
import { FormCard } from "./form-card/FormCard";

export function AllocateLeavesPage({ history }) {
  const FormUIEvents = {
    openDeleteFormDialog: (id, status) => {
      history.push(`/allocate_leaves/read-all-allocate-leaves/${id}/${status}/delete`);
    },
  };
  return (

    <FormUIProvider FormUIEvents={FormUIEvents}>
      <Route path="/allocate_leaves/read-all-allocate-leaves/:id/:status/delete">
        {({ history, match }) => (
          <FormDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/allocate_leaves/read-all-allocate-leaves");
            }}
          />
        )}
      </Route>
      <FormCard />
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
    </FormUIProvider>
  );
}
