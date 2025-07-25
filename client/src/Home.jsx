import React, { useState,useRef,useEffect } from "react";
import "./App.css";
import chabotgif from './assets/gif/chatbotgif.gif';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

  useEffect(() => {
    Splitting();
  }, []);

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
        body: JSON.stringify({ symptoms: input }),
      });

      const data = await res.json();
      setResponse(data);
       
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
  {"DoctorGo - Symptom Checker".split("").map((char, index) => (
    <span
      key={index}
      className="char"
      style={{ "--char-index": index }}
    >
      {char}
    </span>
  ))}
</h2>

    
      <div className="typewriter">
        <p >
            Enter your symptoms below to get  possible conditions & suggestions.
          </p>
      </div>
      <div className="app-container">
        
        <div className="card">
        
          

          <div className="input-group">
            <textarea
              placeholder="e.g. fever, headache, nausea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>

            <div className="button-group">
              <button onClick={handleCheck}>Check My Symptoms</button>
              <button onClick={handleReset} className="reset">Reset</button>
            </div>
          </div>

          {loading && <p>Analyzing symptoms...</p>}

          {response && (
            <div className="response">
              <h2>Possible Conditions:</h2>

              {response.conditions.map((cond, idx) => (
                <div
                  key={idx}
                  className={`condition-card ${cond.name === "Error" ? "error" : ""}`}
                >
                  <h3>{idx + 1}. {cond.name}</h3>
                  <p>{cond.description}</p>

                  {cond.extraSymptoms && cond.extraSymptoms.length > 0 && (
                    <>
                      <p><strong class="symptoms-heading">Associated Symptoms:</strong></p>
                      <ul >
                        {cond.extraSymptoms.map((sym, i) => (
                          <li className="li" key={i}>{sym}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <p><strong>Suggested Specialist:</strong> {cond.specialist}</p>
                  <button onClick={() => handleFindDoctors(cond.specialist)}>
  Find Nearby {cond.specialist}
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
