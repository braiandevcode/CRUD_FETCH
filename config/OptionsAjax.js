//******************CLASE DE CONFIGURACION DE CABECERA***************
const headers = { "Content-Type": "application/json; charset= utf-8" };
class OptionAjax {
  constructor($form) {
    this.$form = $form;
  }

  // METODO DE OPCIONES AJAX
  optionFetch(method) {
    let body = {};
    let formData = null;

    // SI EL FORM EXISTE Y SI CONTIENE HIJOS
    if (this.$form && this.$form.children.length > 0) {
      formData = new FormData(this.$form);
      // ASEGURAMOS DE QUE SI EL ID ESTA VACIO IGNORE ESTE CAMPO
      if (!formData.get("id")) {
        formData.delete("id");
      }
      formData.forEach((value, key) => {
        body[key] = value;
      });
    }
    // OBJETO
    let options = {
      method,
      headers,
      body: JSON.stringify(body),
    };
    return options;
  }
}

export default OptionAjax;
