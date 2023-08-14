const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultado = document.getElementById("result");

const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

// Selecionando e pegando as informações das teclas
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

// Botão de limpar
document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
  input.focus(); // vai focar automaticamente no input
  resultado.classList.remove("error"); // removendo mensagem de erro, caso ocorra
  resultado.value = ""; // zerando o resultado
});

// Pegando os valores do teclado
input.addEventListener("keydown", function (ev) {
  ev.preventDefault();
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }

  if (ev.key == "Backspace") {
    input.value = input.value.slice(0, -1);
  }

  if (ev.key === "Enter") {
    calcular();
  }
});

// Calculando
document.getElementById("equal").addEventListener("click", calcular);
function calcular() {
  resultado.value = "ERROR";
  resultado.classList.add("error");
  resultado.value = eval(input.value);
  resultado.classList.remove("error");
}

// Trocando o tema
document.getElementById("switchTheme").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--txt-color", "rgb(24, 27, 28)");
    input.style.setProperty("border-color", "rgb(24, 27, 28)");
    root.style.setProperty("--btn-swc-theme-color", "white");
    root.style.setProperty("--btn-swc-theme-hover-color", "rgb(24, 27, 28)");
    root.style.setProperty("--btn-keys-color", "rgb(69, 120, 122)");
    root.style.setProperty("--btn-keys-hover-color", "rgb(44, 78, 79)");
    root.style.setProperty("--resultado-color", "rgb(24, 27, 28)");
    root.style.setProperty("--resultado-text-color", "rgb(24, 27, 28)");
    root.style.setProperty("--primary-color", "rgb(69, 120, 122)");

    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "rgb(24, 27, 28)");
    root.style.setProperty("--txt-color", "#fff");
    input.style.setProperty("border-color", "transparent");
    root.style.setProperty("--btn-swc-theme-color", "rgb(24, 27, 28)");
    root.style.setProperty("--btn-swc-theme-hover-color", "#fff");
    root.style.setProperty("--btn-keys-color", " rgb(97, 217, 221)");
    root.style.setProperty("--btn-keys-hover-color", "rgb(67, 171, 172)");
    root.style.setProperty("--resultado-color", "wheat");
    root.style.setProperty("--resultado-text-color", "wheat");
    root.style.setProperty("--primary-color", "rgb(97, 217, 221)");

    main.dataset.theme = "dark";
  }
});

// Copiando para área de transferência
document
  .getElementById("CopyToClipboard")
  .addEventListener("click", function (ev) {
    const button = ev.currentTarget;
    if (button.innerText === "Copy") {
      button.innerText = "Copied!";
      button.classList.add("success");
      navigator.clipboard.writeText(resultado.value);
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  });
