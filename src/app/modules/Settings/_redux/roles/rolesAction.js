import * as requestFromServer from "./rolesCrud";
import { rolesSlice, callTypes } from "./rolesSlice";
import { toast } from "react-toastify";

const { actions } = rolesSlice;

export const fetchRoles = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));

  return requestFromServer
    .getAllRoles(queryParams)
    .then((response) => {
      //const entities = response.data?.data
      dispatch(actions.rolesFetched(response.data?.data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Roles";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchRole = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.roleFetched({ roleForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRoleById({ id: id })
    .then((response) => {
      const entities = response.data?.data;
      dispatch(actions.roleFetched({ roleForEdit: entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      toast.error(error.clientMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};

export const createRole = (roleForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRole(roleForCreation)
    .then((res) => {
      const role = res.data?.data;
      dispatch(actions.roleCreated({ role }));
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      toast.error(error.clientMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};

export const deleteRole = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));

  return requestFromServer
    .deleteRole({ id: id })
    .then((response) => {
      dispatch(actions.roleDeleted({ id: id }));
      toast.success(response.data.message + " Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      error.clientMessage = "Can't deleterole";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      toast.error("Error 😣");
    });
};

export const updateRole = (role) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRole(role)
    .then((response) => {
      const updatedRole = response?.data?.data;
      dispatch(actions.roleUpdated({ updatedRole }));
      toast.success(response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      //error.clientMessage = "Can't update User"
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const accessRights = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAllAccessRights(queryParams)
    .then((response) => {
      const queryParams = response.data?.data;
      dispatch(actions.accessRightsFetched(queryParams));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Roles";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const updateAccessRightByRoleAndResourceId = (role) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAccessRightByRoleAndResourceId(role)
    .then((response) => {
      const updatedRole = response.data?.data;
      toast.success(response.data.message + " Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((error) => {
      //error.clientMessage = "Can't update User"
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
