import { getAllUsers } from "./config/action.js";
import { eventClick, eventSubmit } from "./js/events.js";

const d = document;

// IDENTIFICADORES HTML
const $cancelar = d.createElement("BUTTON"),
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $submit = d.getElementById("submit"),
  $fragment = d.createDocumentFragment(),
  inputName = $form.querySelectorAll("[name]"),
  $template = d.getElementById("crud-template").content;

let PORT = 3000;
let url = `http://localhost:${PORT}/usuarios`;

//****************EVENTO DE CARGA DE PAGINA*************
d.addEventListener("DOMContentLoaded", async  ()=>{
    $cancelar.classList.add("cancel--hidden");
    $cancelar.textContent = "Cancelar";
    getAllUsers(url, $table, $template, $fragment);
});
eventClick($cancelar, $table, $title, $submit, inputName, $fragment, url);
eventSubmit($form,url);

