import {
  loopNodeListChanged,
  loopNodeListSubmit,
} from "../helper/loopNodeList.js";
import { createUser, deleteUser, editUser, getUser } from "./crud.js";

const d = document;

// EVENTO DE CLICK
export const eventClick = (
  $table,
  $title,
  $submit,
  $inputName,
  $fragment,
  url
) => {
  // ***EVENTO DE CLICK*******
  d.addEventListener("click", async (e) => {
    // SI EL BOTON ES DE EDITAR
    if (e.target.matches(".editar") || e.target.matches(".bi-pencil-fill")) {
      e.preventDefault(); //PREVENTIR COMPORTAMIENTO
      e.target.disabled = true; //DESABILITAR BOTON

      // SE CREA EL BOTON CANCELAR
      const $containerBtnsForm = d.querySelector(".crud__form-buttons");
      // AEGURAR QUE SIEMPRE SE UN SOLO BOTON DE CANCELAR
      if ($containerBtnsForm.children.length == 2) {
        $containerBtnsForm.removeChild($containerBtnsForm.lastElementChild);
      }

      // CREAR BOTON DE CANCELAR
      const $cancelar = d.createElement("BUTTON");
      $cancelar.classList.add("crud__btn", "crud__form-cancel");
      $cancelar.textContent = "Cancelar";

      $fragment.appendChild($cancelar);
      $submit.after($fragment);

      $title.textContent = "Editar usuario";
      $submit.value = "Guardar";

      const { id } = e.target.dataset; //DESESTRUCTURACIÓN

      const currentValues = await getUser(url, id); //BUSCAMOS EN JSON POR SU ID

      //RECORREMOS TODOS LOS CAMPOS DEL FORM PARA ACTUALIZAR SIS VALORES EN LA VISTA
      $inputName.forEach((input) => {
        let key = input.name;
        let value = currentValues[key];
        input.value = currentValues[key] = value;
      });
    }

    // SI EL BOTON ES ELIMINAR
    if (e.target.matches(".eliminar") || e.target.matches(".bi-trash3-fill")) {
      let isConfirm = confirm(
        `¿Estas seguro de querer eliminar los datos del registro: ${e.target.dataset.id}?.`
      );
      if (isConfirm) {
        //Eliminar-DELETE
        deleteUser(`${e.target.dataset.id}`, url);
      }
    }

    // SI EL BOTON ES CANCELAR
    if (e.target.matches(".crud__btn")) {
      e.preventDefault();
      let $BUTTON__EDIT = $table.querySelector("button[disabled]");
      $title.textContent = "Agregar usuario";
      $submit.value = "Enviar";
      $inputName.forEach((input, i) => {
        input.value = "";
      });

      // LOCALIZO BOTON
      const $cancelar = d.querySelector(".crud__btn");

      $cancelar.classList.replace(
        "crud__form-cancel",
        "crud__form-cancel--hidden"
      );

      if ($BUTTON__EDIT != null) {
        $BUTTON__EDIT.disabled = false;
      }
    }
  });
};

// *****************EVENTO SUBMIT*****************************//
export const eventSubmit = ($form, url) => {
  d.addEventListener("submit", async (e) => {
    try {
      // SI EL TARGET CORRESPONDE AL FORMULARIO QUE SE LE PASA
      if (e.target === $form) {
        e.preventDefault(); //PREVENIMOS
        const $inputs = $form.querySelectorAll("[name]");

        let isValid = loopNodeListSubmit($inputs);

        // SI ES VALIDO
        if (isValid) {
          let idHiddenForm = e.target.elements["id"]?.value;
          try {
            if (!idHiddenForm) {
              await createUser(url); // Crear - POST
            } else {
              await editUser(idHiddenForm, url); // Editar - PUT
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
};

// EVENTO CAMBIOS EN INPUT DE FORMULARIO
export const eventChange = ($form) => {
  if ($form) {
    const $inputs = $form.querySelectorAll("[name]");
    loopNodeListChanged($inputs);
  }
};
