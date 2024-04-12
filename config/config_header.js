//******************CLASE DE CONFIGURACION DE CABECERA***************
const headers = { "Content-Type": "application/json; charset= utf-8" };
class EventBody {
    constructor(name, surname, age, email) {
      this.name = name;
      this.surname = surname;
      this.age = age;
      this.email = email;
    }
    optionFetch(e, method) {
      let body = {
        name: e.target.name.value,
        surname: e.target.surname.value,
        age: e.target.age.value,
        email: e.target.email.value,
      };
      let options = {
        method,
        headers,
        body: JSON.stringify(body),
      };
      return options;
    }
}

export default EventBody;