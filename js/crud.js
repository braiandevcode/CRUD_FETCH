import OptionsAjax from "../config/OptionsAjax.js";
import { successApiJsonServer, messageErrorApiJsonServer } from "./renders.js";

const $FORM = document.querySelector(".crud__form");
const NEW_EVENT_SUBMIT = new OptionsAjax($FORM);

//***********OBTENER DATOS ACTUALES**************+
export const getAllUsers = async (url, $table, $template, $fragment) => {
  try {
    const fetchData = await fetch(url);
    if (!fetchData.ok)
      throw { status: fetchData.status, statusText: fetchData.statusText };

    const dataJson = await fetchData.json(); //parseamos
    return successApiJsonServer(dataJson, $table, $template, $fragment);
  } catch (err) {
    let message = err.statusText || "Not Found";
    if (err.status >= 500 && err.status < 600) {
      let serverError = "Error de servidor";
      messageErrorApiJsonServer(`Error ${500}: ${serverError}`);
    } else if (err.status >= 400 && err.status < 500) {
      messageErrorApiJsonServer(`Error ${err.status}: ${message}`);
    }
  }
};

export const getUser = async (url, id) => {
  try {
    const fetchData = await fetch(`${url}/${id}`);
    if (!fetchData.ok)
      throw { status: fetchData.status, statusText: fetchData.statusText };

    const dataJson = await fetchData.json(); //parseamos
    return dataJson;
  } catch (err) {
    let message = err.statusText || "Not Found";
    if (err.status >= 500 && err.status < 600) {
      let serverError = "Error de servidor";
      messageErrorApiJsonServer(`Error ${500}: ${serverError}`);
    } else if (err.status >= 400 && err.status < 500) {
      messageErrorApiJsonServer(`Error ${err.status}: ${message}`);
    }
  }
};

// CREAR NUEVO REGISTRO
export const createUser = async (url) => {
  try {
    let options = NEW_EVENT_SUBMIT.optionFetch("POST");
    const fetchData = await fetch(url, options);
    if (!fetchData.ok)
      throw {
        status: fetchData.status,
        statusText: fetchData.statusText,
      };
    const dataJson = await fetchData.json(); //parseamos
    if (dataJson) location.reload();
  } catch (err) {
    let message = err.statusText || "Not Found";
    if (!err.status) {
      let serverError = "Error de servidor";
      messageErrorApiJsonServer(`Error ${500}: ${serverError}`);
    } else if (err.status > 400 && err.status < 500) {
      messageErrorApiJsonServer(`Error ${err.status}: ${message}`);
    }
  }
};

// EDITAR REGISTRO
export const editUser = async (id, url) => {
  try {
    // LLAMAMOS A LAS OPCIONES DE CABECERA PARA EL EDIT
    let options = NEW_EVENT_SUBMIT.optionFetch("PUT");
    const fetchData = await fetch(`${url}/${id}`, options);

    if (!fetchData.ok)
      throw {
        status: fetchData.status,
        statusText: fetchData.statusText,
      };

    const dataJson = await fetchData.json(); //parseamos
    if (dataJson) location.reload();
  } catch (err) {
    let message = err.statusText || "Not Found";
    if (!err.status) {
      let serverError = "Error de servidor";
      messageErrorApiJsonServer(`Error ${500}: ${serverError}`);
    } else if (err.status > 400 && err.status < 500) {
      messageErrorApiJsonServer(`Error ${err.status}: ${message}`);
    }
  }
};

// ELIMINAR REGISTRO
export const deleteUser = async (id, url) => {
  try {
    // BUSCAR POR SU ID Y ELIMINAR
    const fetchData = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    //SI ALGO SALE MAL
    if (!fetchData.ok)
      throw {
        status: fetchData.status,
        statusText: fetchData.statusText,
      };

    const dataJson = await fetchData.json(); //parseamos
    // SI TODO VA BIEN EVITAMOS QUE RECARGE LA PAGINA CON EL ID QUE YA NO EXISTE REMOVIENDOLO
    // document.querySelector(`data-id=${idRegister}`).remove();
    if (dataJson) location.reload();
  } catch (err) {
    let message = err.statusText || "Not Found";
    if (!err.status) {
      let serverError = "Error de servidor";
      messageErrorApiJsonServer(`Error ${500}: ${serverError}`);
    } else if (err.status > 400 && err.status < 500) {
      messageErrorApiJsonServer(`Error ${err.status}: ${message}`);
    }
  }
};
