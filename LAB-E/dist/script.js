/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


// Stan aplikacji
var appState = {
  currentStyleIndex: 0,
  respStyle: "resp.css",
  styles: []
};
// Funkcja do zmiany stylu
function changeStyles(styleIndex) {
  // Usuwamy wszystkie stare style
  var oldStyles = document.querySelectorAll('link[rel="stylesheet"]');
  oldStyles.forEach(function (style) {
    return style.remove();
  });
  // Dodajemy nowy styl
  var newStyle = document.createElement("link");
  newStyle.rel = "stylesheet";
  newStyle.href = "styles/".concat(appState.styles[styleIndex].file);
  document.head.appendChild(newStyle);
  // Dodajemy styl "resp.css" za każdym razem
  var respStyle = document.createElement("link");
  respStyle.rel = "stylesheet";
  respStyle.href = "styles/".concat(appState.respStyle);
  document.head.appendChild(respStyle);
}
// Funkcja do obsługi kliknięcia przycisku zmiany stylu
function handleStyleSwitchClick() {
  // Wywołujemy funkcję zmiany stylu na kolejny
  appState.currentStyleIndex = (appState.currentStyleIndex + 1) % appState.styles.length;
  changeStyles(appState.currentStyleIndex);
}
// Inicjalizacja aplikacji po załadowaniu strony
document.addEventListener("DOMContentLoaded", function () {
  // Definiujemy dostępne style
  appState.styles = [{
    name: "style1",
    file: "style1.css"
  }, {
    name: "style2",
    file: "style2.css"
  }
  // Dodaj tutaj inne style, jeśli potrzebujesz
  ];
  // Podpinamy obsługę kliknięcia przycisku
  var styleSwitchButton = document.getElementById("styleSwitch");
  if (styleSwitchButton) {
    styleSwitchButton.addEventListener("click", handleStyleSwitchClick);
  }
  // Dodajemy początkowe style
  changeStyles(appState.currentStyleIndex);
});
/******/ })()
;