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
    if (e.target.matches(".editar") || e.target.matches(".bi-pencil-fill")) {
      e.target.disabled = true;
      e.preventDefault();
      $cancelar.classList.replace("crud__form-cancel--hidden", "crud__form-cancel");
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

    if (e.target.matches(".eliminar") || e.target.matches(".bi-trash3-fill")) {
      let isConfirm = confirm(
        `¿Estas seguro de querer eliminar los datos del registro: ${e.target.dataset.id}?.`
      );
      if (isConfirm) {
        //Eliminar-DELETE
        deleteUser(`${e.target.dataset.id}`, url);
      }
    }

    if (e.target.matches(".crud__form-cancel")) {
      e.preventDefault();
      let $BUTTON__EDIT = $table.querySelector("button[disabled]");
      $title.textContent = "Agregar usuario";
      $submit.value = "Enviar";
      inputName.forEach((input, i) => {
        input.value = "";
      });
      $cancelar.classList.replace("crud__form-cancel", "crud__form-cancel--hidden");
      
      if($BUTTON__EDIT != null){
        $BUTTON__EDIT.disabled = false;
      }
    }
  });
};
