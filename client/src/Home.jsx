import React, { useState,useRef,useEffect } from "react";
import "./App.css";
import chabotgif from './assets/gif/chatbotgif.gif';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from 'react-i18next';

import Splitting from "splitting";
import "splitting/dist/splitting.css";
import DoctorList from "./DoctorList";;

import { useNavigate } from "react-router-dom";


export default function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const responseRef=useRef(null); 
  const navigate = useNavigate();
const { i18n, t } = useTranslation();

useEffect(() => {
  if (i18n.language === "en") {
    Splitting();
  }
}, [i18n.language]);

  const handleCheck = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:5000/api/check", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    symptoms: input,
    language: i18n.language, // 🔥 this sends the selected language to backend
  }),
});


      const data = await res.json();
      setResponse(data);
       setTimeout(() => {
  if (responseRef.current) {
    responseRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}, 100);  
    } catch (error) {
      console.error("Error:", error);
      setResponse({
        conditions: [
          {
            name: "Error",
            description: "Unable to connect to the backend.",
            extraSymptoms: [],
            specialist: "Try again later",
          },
        ],
      });
      
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput("");
    setResponse(null);
  };
  const handleFindDoctors = (specialist) => {
      alert(`Searching for nearby ${specialist} in Dundigal...`);

    navigate("/doctors", { state: { specialist } });
  };
  

  return (
    <div className="page-wrapper">
   
      <div className="image">
        <img src={chabotgif} alt="" />
      </div>
      
<h2 className="animated-heading">
  {i18n.language === "en" ? (
    t("title").split("").map((char, index) => (
      <span
        key={index}
        className="char"
        style={{ "--char-index": index }}
      >
        {char}
      </span>
    ))
  ) : (
    <span className="non-english-heading">{t("title")}</span>
  )}
</h2>


    
      <div className="typewriter">
        <p>{t("instruction")}</p>

      </div>
      <div className="app-container">
        
        <div className="card">
        
          

          <div className="input-group">
            <textarea
              placeholder={t("inputPlaceholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>

            <div className="button-group">
               <LanguageSelector />
              <button onClick={handleCheck}>{t("checkBtn")}</button>
              <button onClick={handleReset} className="reset">{t("resetBtn")}</button>
            </div>
          </div>

          

          {response && (
            <div className="response"ref={responseRef}>
              <h2>{t("possibleConditions")}</h2>

              {response.conditions.map((cond, idx) => (
                <div
                  key={idx}
                  className={`condition-card ${cond.name === "Error" ? "error" : ""}`}
                >
                  <h3>{idx + 1}. {cond.name}</h3>
                  <p>{cond.description}</p>

                  {cond.extraSymptoms && cond.extraSymptoms.length > 0 && (
                    <>
                      <p><strong class="symptoms-heading">{t("associatedSymptoms")}</strong></p>
                      <ul >
                        {cond.extraSymptoms.map((sym, i) => (
                          <li className="li" key={i}>{sym}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <p><strong>{t("specialist")}:</strong> {cond.specialist}</p>
                  <button onClick={() => handleFindDoctors(cond.specialist)}>
  {t("findNearby", { specialist: cond.specialist })}
</button>

                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>

      <footer className="footer">
        <p>© 2025 DoctorGo. All rights reserved.</p>
      </footer>
    </div>
      </div>
      
    </div>
  );
}
