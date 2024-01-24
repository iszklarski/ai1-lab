// Tworzymy interfejs do przechowywania informacji o stylach
interface StyleInfo {
    name: string;
    file: string;
  }
  
  // Stan aplikacji
  let appState = {
    currentStyleIndex: 0,
    respStyle: "resp.css",
    styles: [] as StyleInfo[],
  };
  
  // Funkcja do zmiany stylu
  function changeStyles(styleIndex: number): void {
    // Usuwamy wszystkie stare style
    const oldStyles = document.querySelectorAll('link[rel="stylesheet"]');
    oldStyles.forEach((style) => style.remove());
  
    // Dodajemy nowy styl
    const newStyle = document.createElement("link");
    newStyle.rel = "stylesheet";
    newStyle.href = `styles/${appState.styles[styleIndex].file}`;
    document.head.appendChild(newStyle);
  
    // Dodajemy styl "resp.css" za każdym razem
    const respStyle = document.createElement("link");
    respStyle.rel = "stylesheet";
    respStyle.href = `styles/${appState.respStyle}`;
    document.head.appendChild(respStyle);
  }
  
  // Funkcja do obsługi kliknięcia przycisku zmiany stylu
  function handleStyleSwitchClick(): void {
    // Wywołujemy funkcję zmiany stylu na kolejny
    appState.currentStyleIndex = (appState.currentStyleIndex + 1) % appState.styles.length;
    changeStyles(appState.currentStyleIndex);
  }
  
  // Inicjalizacja aplikacji po załadowaniu strony
  document.addEventListener("DOMContentLoaded", () => {
    // Definiujemy dostępne style
    appState.styles = [
      { name: "style1", file: "style1.css" },
      { name: "style2", file: "style2.css" },
      // Dodaj tutaj inne style, jeśli potrzebujesz
    ];
  
    // Podpinamy obsługę kliknięcia przycisku
    const styleSwitchButton = document.getElementById("styleSwitch");
    if (styleSwitchButton) {
      styleSwitchButton.addEventListener("click", handleStyleSwitchClick);
    }
  
    // Dodajemy początkowe style
    changeStyles(appState.currentStyleIndex);
  });
  