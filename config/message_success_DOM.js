
const d = document;
// *********FUNCIÓN SUCCESS API JSON-SERVER***************//
  export const successApiJsonServer = (res, $table,$template, $fragment) => {
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