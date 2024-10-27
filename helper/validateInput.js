const regexNombre =
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(?:[\s-][a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/;
const regexApellido =
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(?:[\s-][a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/;
const regexEdad = /^(?:[1-9]\d?|0)$/; // Números del 0 al 99
const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

export const validateInput = (input) => {
  if (input.name === "id") return true;
  let regex;
  switch (input.name) {
    case "name":
      regex = regexNombre;
      break;
    case "surname":
      regex = regexApellido;
      break;
    case "age":
      regex = regexEdad;
      break;
    case "email":
      regex = regexEmail;
      break;
    default:
      return false;
  }
  let isValid = regex.test(input.value);

  return isValid;
};
