// AUX PARA AÑADIR DATASET
const addDataSet = (objUser, parent, key, ...selectors) => {
  let element;
  if (selectors.length > 0) {
    selectors.forEach((selector) => {
      if (parent) {
        element = parent.querySelector(`.${selector}`);
      } else {
        return console.error("No se ah añadido el elemento padre");
      }
      if (element) {
        element.dataset[key] = objUser[key];
      }
    });
  }
};
export default addDataSet;
