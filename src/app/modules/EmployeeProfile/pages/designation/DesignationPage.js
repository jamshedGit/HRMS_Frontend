import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DesignationUIProvider } from "./DesignationUIContext";
import { DesignationEditDialog } from "./designation-edit-dialog/DesignationEditDialog";
import { AcademicEditDialog } from "./designation-edit-dialog/AcademicEditDialog";
import { ContactEditDialog } from "./designation-edit-dialog/ContactEditDialog";
import { BankDeleteDialog } from "./bank-delete-dialog/BankDeleteDialog";
import { DesignationActiveDialog } from "./bank-active-dialog/BankActiveDialog";
import { ReligionCard } from "./religion-card/ReligionCard";
import { fetchAllCountry } from "../../../../../_metronic/redux/dashboardActions";
import {
  fetchUserStatusTypes,
  fetchRoles,
  fetchCenters,
} from "../../_redux/designationActions";


// dispatch(actions.fetchRoles());
//     dispatch(actions.fetchCenters());

export function ProfilePage({ history }) {
  const dispatch = useDispatch();
  const DesignationUIEvents = {

    newAcademicButtonClick: () => {
    
      history.push("/academic/read-all-academic/new");
    },

    newContactButtonClick: () => {
    
      history.push("/contact/read-all-contact/new");
    },

    newWorkExperienceButtonClick: () => {
    
      history.push("/experience/read-all-experience/new");
    },

    newSkillButtonClick: () => {
    
      history.push("/skills/read-all-skills/new");
    },

    newIncidentButtonClick: () => {
    
      history.push("/incident/read-all-incident/new");
    },

    newDesignationButtonClick: () => {
      // dispatch(fetchAllCountry());
      // dispatch(fetchRoles());
      // dispatch(fetchCenters());
      // dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push("/profile/read-all-profile/new");
    },
    openEditDesignationDialog: (id) => {
      // dispatch(fetchAllCountry());
      // dispatch(fetchRoles());
      // dispatch(fetchCenters());
      // dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push(`/profile/read-all-profile/${id}/edit`);
    },
    openDeleteDesignationDialog: (id, status) => {
      history.push(`/profile/read-all-profile/${id}/${status}/delete`);
    },
    openActiveDesignationDialog: (id) => {
      history.push(`/profile/read-all-profile/${id}/active`);
    },
    openReadDesignationDialog: (id, isUserRead) => {
      
      // dispatch(fetchAllCountry());
      // dispatch(fetchRoles());
      // dispatch(fetchCenters());
      // dispatch(fetchUserStatusTypes({ filter: { normal: true } }));
      history.push(`/profile/read-all-profile/${id}/read`);
    },
  };
  return (
    
    <DesignationUIProvider DesignationUIEvents={DesignationUIEvents}>
       <Route exact path="/contact/read-all-contact/new">
        {({ history, match }) => (
          <AcademicEditDialog
            show={match != null}
            onHide={() => {
              history.push("/contact/read-all-contact");
            }}
          />
        )}
      </Route>
      <Route exact path="/contact/read-all-contact/new">
        {({ history, match }) => (
          <ContactEditDialog
            show={match != null}
            onHide={() => {
              history.push("/contact/read-all-contact/new");
            }}
          />
        )}
      </Route>
      <Route exact path="/profile/read-all-profile/new">
        {({ history, match }) => (
          <DesignationEditDialog
            show={match != null}
            onHide={() => {
              history.push("/profile/read-all-profile");
            }}
          />
        )}
      </Route>
      <Route path="/profile/read-all-profile/:id/edit">
        {({ history, match }) => (
          <DesignationEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/profile/read-all-profile");
            }}
          />
        )}
      </Route>
      <Route path="/profile/read-all-profile/:id/read">
        {({ history, match }) => (
          <DesignationEditDialog
            show={match != null}
            id={match && match.params.id}
            userForRead={true}
            onHide={() => {
              history.push("/profile/read-all-profile");
            }}
          />
        )}
      </Route>
      <Route path="/profile/read-all-profile/:id/:status/delete">
        {({ history, match }) => (
          <BankDeleteDialog
            show={match != null}
            id={match && match.params.id}
            status={match && match.params.status}
            onHide={() => {
              history.push("/profile/read-all-profile");
            }}
          />
        )}
      </Route>
      <Route path="/profile/read-all-profile/:id/active">
        {({ history, match }) => (
          <DesignationActiveDialog
            show={match != null}
            id={match && match.params.id}
            //status={match && match.params.status}
            onHide={() => {
              history.push("/profile/read-all-profile");
            }}
          />
        )}
      </Route>



      <ReligionCard />
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
    </DesignationUIProvider>
  );
}
