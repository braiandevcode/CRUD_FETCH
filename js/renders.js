import addDataSet from "../helper/addDataSet.js";

const d = document;
const $fragment = d.createDocumentFragment();

// *********FUNCIÓN QUE RENDERIZA LA TABLA***************//

export const successApiJsonServer = (res, $table, $template, $fragment) => {
  res.forEach((objUser) => {
    // RECORRER LOS TD DENTRO DEL TEMPLATE
    $template.firstElementChild.querySelectorAll("div").forEach((div, i) => {
      const { id, ...data } = objUser; //EXCLUIMOS EL ID PARA QUE NO LO PONGA EN LA VISTA

      //GUARDAMOS SOLO EL VALOR DE CADA LLAVE
      let value = Object.values(data)[i];

      // AGREGAMOS  LOS DATASET ID A LOS ELEMENTOS LOCALIZADOS
      addDataSet(
        objUser,
        div,
        "id",
        "editar",
        "editar i",
        "eliminar",
        "eliminar i"
      );

      // SI NO CONTIENE ELEMENTOS HIJOS NO SON LOS BOTONES
      if (div.children.length == 0) {
        // ASIGNAMOS EL VALOR CORRESPONDIENTE AL TD
        if (i === 0 || i === 1) {
          div.textContent =
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        } else {
          div.textContent = value.toLowerCase();
        }
      }
    });
    // CREAMOS Y GUARDAMOS TEMPLATE
    let $clone = d.importNode($template, true);
    $fragment.append($clone);
  });
  // GUARDAMOS EL REGISTRO EN LA TRABLA
  const $tableRow = $table.querySelector(".crud__table-row");
  $tableRow.append($fragment);
};

//*****************************FUNCIÓN PARA RENDERIZAR MENSAJE DE ERROR****************//
export const messageErrorApiJsonServer = (err) => {
  const $containerDetail = d.createElement("DIV");
  $containerDetail.classList.add("container-error");
  const $error = d.createElement("P");
  $error.classList.add("container-error__text");
  const $detail = d.createElement("SPAN");
  $containerDetail.append($error);
  $containerDetail.append($detail);
  $error.textContent = err;
  err.includes("Not Found")
    ? ($detail.textContent =
        "La URL especificada no se encontró por favor, verifique que este escrita correctamente.")
    : ($detail.textContent =
        "Esto puede ser por varias razones como tareas de mantenimiento, por favor, para mas detalles, comuniquese con soporte a soporte@gmail.com");
  $fragment.append($containerDetail);
  d.body.replaceChildren($fragment);
};
