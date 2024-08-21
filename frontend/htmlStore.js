import dataStore from "./dataStore.js";
import functions from "./functions.js";

window.onload = function () {
  localStorage.removeItem("hasCodeRunBefore")

  if (localStorage.getItem("hasCodeRunBefore") === null) {
      functions.firstLoad()
      localStorage.setItem("hasCodeRunBefore", true);
  }
}

//to one module
const htmlStore = {
  dataStore,
  functions
}

export default htmlStore