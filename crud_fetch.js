const d = document;
// OBTENER DATOS
const $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $submit = d.getElementById("submit"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

let PORT = 3000;
let url = `http://localhost:${PORT}/usuarios`;

// funcion auxiliar error
const messageError = (err) => {
  const $containerDetail = d.createElement("DIV");
  const $error = d.createElement("P");
  const $detail = d.createElement("SPAN");
  $containerDetail.append($error);
  $containerDetail.append($detail);
  $error.classList.add("error");
  $error.textContent = err;

  err.includes("Not Found")
    ? ($detail.textContent =
        "La URL especificada no se encontró por favor, verifique que este escrita correctamente.")
    : ($detail.textContent =
        "Esto puede ser por varias razones como tareas de mantenimiento, por favor, para mas detalles, comuniquese con soporte a soporte@gmail.com");

  $fragment.append($containerDetail);

  $table.after($fragment);
};

// funcion auxiliar success
const success = (res) => {
  res.forEach((el) => {
    // excluimos el id
    const { id, ...resto } = el;
    // creamos nuevo objeto con la copia que excluye el id
    const data = { ...resto };
    // recorremos los td dentro del template
    $template.querySelectorAll("td").forEach((td, i) => {
      let value = Object.values(data)[i];
      // evaluamos para acceder a los botones
      if (td.children.length > 0) {
        let butonEdit = td.querySelector(".editar");
        let buttonDelete = td.querySelector(".eliminar");
        butonEdit.textContent = "Editar";
        buttonDelete.textContent = "Eliminar";
        butonEdit.dataset.id = el.id;
        butonEdit.dataset.name = el.name.toLowerCase().trim();
        butonEdit.dataset.surname = el.surname.toLowerCase().trim();
        butonEdit.dataset.age = el.age;
        butonEdit.dataset.email = el.email.toLowerCase().trim();
        butonEdit.dataset.job = el.job.toLowerCase();
        butonEdit.dataset.comment = el.comment.toLowerCase();
        buttonDelete.dataset.id = el.id;
      } else {
        // asignamos el valor correspondiente al td
        if (i === 0 || i === 1) {
          td.textContent =value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        } else {
          td.textContent = value.toLowerCase();
        }
      }
    });
    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
  });

  $table.querySelector("tbody").appendChild($fragment);
};

//***********FUNCIÓN PARA OBTENER DATOS ACTUALES**************+
const getAllUsers = async () => {
  try {
    const fetchData = await fetch(url);
    if (!fetchData.ok)
      throw { status: fetchData.status, statusText: fetchData.statusText };

    const dataJson = await fetchData.json(); //parseamos
    return success(dataJson);
  } catch (err) {
    let message = err.statusText || "Not Found";
    if (!err.status) {
      let serverError = "Error de servidor";
      messageError(`Error ${500}: ${serverError}`);
    } else if (err.status > 400 && err.status < 500) {
      messageError(`Error ${err.status}: ${message}`);
    }
  }
};

//****************EVENTO DE CARGA DE PAGINA*************
d.addEventListener("DOMContentLoaded", getAllUsers);


//******************CLASE DE CONFIGURACION DE CABECERA***************
class EventBody {
  constructor(name, surname, age, email, job, comment) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.email = email;
    this.job = job;
    this.comment = comment;
  }
  optionFetch(e, method) {
    let body = {
      name: e.target.name.value,
      surname: e.target.surname.value,
      age: e.target.age.value,
      email: e.target.email.value,
      job: e.target.job.value,
      comment: e.target.comment.value,
    };
    let options = {
      method,
      headers,
      body: JSON.stringify(body),
    };
    return options;
  }
}
const headers = { "Content-Type": "application/json; charset= utf-8" };
const NEW_EVENT_SUBMIT = new EventBody();


// *****************EVENTO SUBMIT*****************************//
d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();
    let idHiddenForm = e.target.elements["id"].value;
    if (!idHiddenForm) {
      //Crear-POST
      try {
        let options = NEW_EVENT_SUBMIT.optionFetch(e, "POST");
        const fetchData = await fetch(url, options);
        if (!fetchData.ok)
        throw { status: fetchData.status, statusText: fetchData.statusText };

        const dataJson = await fetchData.json(); //parseamos
        if (dataJson) location.reload();
      } catch (err) {
        let message = err.statusText || "Not Found";
        if (!err.status) {
          let serverError = "Error de servidor";
          messageError(`Error ${500}: ${serverError}`);
        } else if (err.status > 400 && err.status < 500) {
          messageError(`Error ${err.status}: ${message}`);
        }
      }
    } else {
      //Editar-PUT
      try {
        let options = NEW_EVENT_SUBMIT.optionFetch(e, "PUT");

        const fetchData = await fetch(`${url}/${idHiddenForm}`, options);

        if (!fetchData.ok)
          throw { status: fetchData.status, statusText: fetchData.statusText };

        const dataJson = await fetchData.json(); //parseamos
        if (dataJson) location.reload();
      } catch (err) {
        let message = err.statusText || "Not Found";
        if (!err.status) {
          let serverError = "Error de servidor";
          messageError(`Error ${500}: ${serverError}`);
        } else if (err.status > 400 && err.status < 500) {
          messageError(`Error ${err.status}: ${message}`);
        }
      }
    }
  }
});

const inputName = $form.querySelectorAll("[name]");
const $cancelar = d.createElement("BUTTON");

$cancelar.classList.add("cancel--hidden");
$cancelar.textContent = "Cancelar";


// ***EVENTO DE CLICK*******
//**evento para mostrar los valores en los input, para eliminar un usuario y modificaciones de interacción de usuario en DOM**
d.addEventListener("click", async (e) => {
  let idRegister = e.target.dataset.id;

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
      `¿Estas seguro de querer eliminar los datos del registro: ${idRegister}?.`
    );
    if (isConfirm) {
      //Eliminar-DELETE
      try {
        const fetchData = await fetch(`${url}/${idRegister}`, {
          method: "DELETE",
        });
        if (!fetchData.ok)
          throw { status: fetchData.status, statusText: fetchData.statusText };

        const dataJson = await fetchData.json(); //parseamos
        if (dataJson) location.reload();
      } catch (err) {
        let message = err.statusText || "Not Found";
        if (!err.status) {
          let serverError = "Error de servidor";
          messageError(`Error ${500}: ${serverError}`);
        } else if (err.status > 400 && err.status < 500) {
          messageError(`Error ${err.status}: ${message}`);
        }
      }
    } else return;
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
