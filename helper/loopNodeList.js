import { validateInput } from "./validateInput.js";

// AÑADIR COLOR DE BORDER SEGÚN TESTEO DE CAMPOS
const changeBorder = (input, isValid = null) => {
  // GUARDAR EN VALID SI LO QUE DEVUELVE LA FUNCIÓN ES TRUE
  const valid = validateInput(input);

  if (!valid) {
    input.classList.add("crud__input--invalid");
    input.classList.remove("crud__input--valid");

    if (isValid !== null) {
      isValid = false;
    }
  } else {
    input.classList.add("crud__input--valid");
    input.classList.remove("crud__input--invalid");
  }
  return isValid;
};

// FUNCION PARA EVENTO CHANGE
export const loopNodeListChanged = ($nodeList) => {
  $nodeList.forEach((input) => {
    input.addEventListener("input", () => {
      // IGNORAR EL INPUT HIDDEN
      if (input.name === "id") return;
      changeBorder(input, null);
    });
  });
};

// FUNCION PARA EVENTO SUBMIT
export const loopNodeListSubmit = ($nodeList) => {
  let isValid = true;
  $nodeList.forEach((input) => {
    // IGNORAR EL INPUT HIDDEN
    if (input.name === "id") return;
    isValid = changeBorder(input, isValid);
  });
  return isValid;
};
