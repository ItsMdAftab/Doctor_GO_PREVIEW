import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div
      className="language-selector"
      
    >
      <label htmlFor="lang-select" style={{ fontWeight: "bold" }}>
         
      </label>
      <select
        id="lang-select"
        onChange={handleChange}
        value={i18n.language}
        style={{
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundImage: "linear-gradient(to right, #a043ff)",
    fontSize: "14px",
    cursor: "pointer",
    marginLeft: "0px",
    color: "white",
  }}
      >
        <option value="en" style={{color:"black"}}>🌐 English</option>
        <option value="hi" style={{color:"black"}}> 🌐 हिन्दी</option>
        <option value="te" style={{color:"black"}}> 🌐తెలుగు</option>
      </select>
    </div>
  );
}
