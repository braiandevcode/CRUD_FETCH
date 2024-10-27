import { configServer } from "./config/configServer.js";
import { getAllUsers } from "./js/crud.js";
import { eventChange, eventClick, eventSubmit } from "./js/events.js";

const d = document;

// IDENTIFICADORES HTML
const $table = d.querySelector(".crud__table"),
  $form = d.querySelector(".crud__form"),
  $title = d.querySelector(".crud__title"),
  $submit = d.getElementById("submit"),
  $fragment = d.createDocumentFragment(),
  $inputName = $form.querySelectorAll("[name]"),
  $template = d.getElementById("crud-template").content;

//****************EVENTO DE CARGA DE PAGINA*************
const { HOST, PORT, PATH } = configServer;
const url = `${HOST}:${PORT}/${PATH}`;

d.addEventListener("DOMContentLoaded", async () => {
  await getAllUsers(url, $table, $template, $fragment);
  eventClick($table, $title, $submit, $inputName, $fragment, url);
  eventSubmit($form, url);
  eventChange($form);
});
