import { createUser, deleteUser, editUser } from "../config/action.js";

const d = document;

// *****************EVENTO SUBMIT*****************************//
export const eventSubmit =($form, url) => {
    d.addEventListener("submit", async (e) => {
        if (e.target === $form) {
           e.preventDefault();
           let idHiddenForm = e.target.elements["id"].value;
            if(!idHiddenForm){
               //Crear-POST
               await createUser(e, url)
            }else{
               //Editar-PUT
               await editUser(e,idHiddenForm, url);
            }
        }
    });
};

export const eventClick = ($cancelar, $table, $title, $submit, inputName, $fragment, url) => {
  // ***EVENTO DE CLICK*******
  //**evento para mostrar los valores en los input, para eliminar un usuario y modificaciones de interacción de usuario en DOM**
  d.addEventListener("click", async (e) => {
    if (e.target.matches(".editar")) {
      e.target.disabled = true;
      e.preventDefault();
      $cancelar.classList.replace("cancel--hidden", "cancelar");
      $fragment.appendChild($cancelar);
      $submit.after($fragment);

      $title.textContent = "Editar usuario";
      $submit.value = "Guardar";

      let dataObject = {};

      inputName.forEach((input, i) => {
        let key = input.name,
          value = e.target.dataset[key];
        input.value = dataObject[key] = [value];
      });
    }

    if (e.target.matches(".eliminar")) {
      let isConfirm = confirm(
        `¿Estas seguro de querer eliminar los datos del registro: ${e.target.dataset.id}?.`
      );
      if (isConfirm) {
        //Eliminar-DELETE
        deleteUser(`${e.target.dataset.id}`, url);
      }
    }

    if (e.target.matches(".cancelar")) {
      e.preventDefault();
      let $BUTTON__EDIT = $table.querySelector("button[disabled]");
      $title.textContent = "Agregar usuario";
      $submit.value = "Enviar";
      inputName.forEach((input, i) => {
        input.value = "";
      });
      $cancelar.classList.replace("cancelar", "cancel--hidden");
      $BUTTON__EDIT.disabled = false;
    }
  });
};
