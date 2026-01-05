import { A as AUTO_MODE, D as DARK_MODE, L as LIGHT_MODE, d as DEFAULT_THEME } from './MainGridLayout_BD3E6ahT.mjs';

function getDefaultHue() {
  const fallback = "250";
  const configCarrier = document.getElementById("config-carrier");
  return Number.parseInt(configCarrier?.dataset.hue || fallback);
}
function getHue() {
  const stored = localStorage.getItem("hue");
  return stored ? Number.parseInt(stored) : getDefaultHue();
}
function setHue(hue) {
  localStorage.setItem("hue", String(hue));
  const r = document.querySelector(":root");
  if (!r) {
    return;
  }
  r.style.setProperty("--hue", String(hue));
}
function applyThemeToDocument(theme) {
  switch (theme) {
    case LIGHT_MODE:
      document.documentElement.classList.remove("dark");
      break;
    case DARK_MODE:
      document.documentElement.classList.add("dark");
      break;
    case AUTO_MODE:
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      break;
  }
}
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  applyThemeToDocument(theme);
}
function getStoredTheme() {
  return localStorage.getItem("theme") || DEFAULT_THEME;
}

export { applyThemeToDocument, getDefaultHue, getHue, getStoredTheme, setHue, setTheme };
