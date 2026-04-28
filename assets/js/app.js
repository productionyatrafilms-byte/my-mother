const btnEn = document.querySelector(".english");
const btnHi = document.querySelector(".hindi");
const btnGu = document.querySelector(".gujrati");

const LANG_KEY = "selectedLanguage";
const DEFAULT_LANG = "English";
let translations = {};

// apply saved language immediately before JSON loads
(function applySavedLangEarly() {
  const savedLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;

  document.documentElement.lang = savedLang;

  if (document.body) {
    if (savedLang === "English") {
      document.body.setAttribute("data-lang", "en");
    } else if (savedLang === "Hindi") {
      document.body.setAttribute("data-lang", "hi");
    } else if (savedLang === "Gujarati") {
      document.body.setAttribute("data-lang", "gu");
    }
  }
})();

// set active button
function setActiveButton(activeBtn) {
  [btnEn, btnHi, btnGu].forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// apply language
function applyLanguage(lang, save = true) {
  const langData = translations[lang];
  if (!langData) return;

  if (save) {
    localStorage.setItem(LANG_KEY, lang);
  }

  document.documentElement.lang = lang;

  if (lang === "English") {
    document.body.setAttribute("data-lang", "en");
    setActiveButton(btnEn);
  } else if (lang === "Hindi") {
    document.body.setAttribute("data-lang", "hi");
    setActiveButton(btnHi);
  } else if (lang === "Gujarati") {
    document.body.setAttribute("data-lang", "gu");
    setActiveButton(btnGu);
  }

  document.querySelectorAll("[data-lang-key]").forEach((el) => {
    const key = el.getAttribute("data-lang-key");
    if (langData[key] !== undefined) {
      el.innerHTML = String(langData[key]).replace(/\n/g, "<br>");
    }
  });
}

// load saved language on refresh/page load/page navigation
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;

  fetch("./assets/json/data.json", { cache: "no-store" })
    .then((res) => res.json())
    .then((data) => {
      translations = data;
      applyLanguage(savedLang, false);
    })
    .catch((err) => console.error("Error loading translations:", err));
});

// button clicks
btnEn.addEventListener("click", () => applyLanguage("English"));
btnHi.addEventListener("click", () => applyLanguage("Hindi"));
btnGu.addEventListener("click", () => applyLanguage("Gujarati"));