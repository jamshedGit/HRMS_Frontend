import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormUIProvider } from "./FormUIContext";
import { FormCard } from "./form-card/FormCard";


export function LeaveApplicationPage({ history }) {
  const FormUIEvents = {
    newFormButtonClick: () => {
      history.push("/leave_application/read-all-leave-application/new");
    },
    openEditFormDialog: (id) => {
      history.push(`/leave_application/read-all-leave-application/${id}/edit`);
    },
    openDeleteFormDialog: (id, status) => {
      history.push(`/leave_application/read-all-leave-application/${id}/${status}/delete`);
    },
    openReadFormDialog: (id, isUserRead) => {
      history.push(`/leave_application/read-all-leave-application/${id}/read`);
    },
  };
  return (

    <FormUIProvider FormUIEvents={FormUIEvents}>
      
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
