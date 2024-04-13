const d = document;
const $fragment = d.createDocumentFragment();

//*****************************FUNCIÓN SUCCESS API JSON-SERVER****************//
export const messageErrorApiJsonServer =(err)=>{
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
}