import EventBody from "./config_header.js";
import {messageErrorApiJsonServer } from "./message_error_DOM.js";
import { successApiJsonServer } from "./message_success_DOM.js";

const NEW_EVENT_SUBMIT = new EventBody();

//***********OBTENER DATOS ACTUALES**************+
export const getAllUsers = async (url, $table, $template,$fragment) => {  
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


// CREAR NUEVO REGISTRO
export const createUser = async (e,url)=>{
    try {
        let options = NEW_EVENT_SUBMIT.optionFetch(e, "POST");
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
}

// EDITAR REGISTRO
export const editUser = async (e,idRegister,url)=>{
    try {
        let options = NEW_EVENT_SUBMIT.optionFetch(e, "PUT");

        const fetchData = await fetch(`${url}/${idRegister}`, options);

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
}

// ELIMINAR REGISTRO
export const deleteUser =async (idRegister, url)=>{
    try {
        const fetchData = await fetch(`${url}/${idRegister}`, {
          method: "DELETE",
        });
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
}