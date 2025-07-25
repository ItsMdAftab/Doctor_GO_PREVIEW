// doctor-go-backend/mlModel.js

function predictConditionsAndSpecialist(symptomsText) {
  const text = symptomsText.toLowerCase();

  const normalize = (word) => word.replace(/ing$|ed$|s$/g, '');

  const textWords = text.split(/\W+/).map(normalize);

  const mappings = [
  {
    keywords: ["cough", "fever", "sore throat", "body pain", "tired", "vomiting"],
    conditions: [
      {
        name: "Viral Fever",
        description: "It might be viral fever. Common symptoms include:",
        extraSymptoms: ["high fever", "body pain", "fatigue", "vomiting"],
        specialist: "General Physician"
      },
      {
        name: "Influenza",
        description: "It might be influenza. Symptoms often include:",
        extraSymptoms: ["fever", "sore throat", "headache", "chills"],
        specialist: "Pulmonologist"
      }
    ]
  },
  {
  keywords: ["headache", "facial pressure", "sensitivity to light", "pain around eyes", "difficulty concentrating"],
  conditions: [
    {
      name: "Migraine",
    description: "This may be a neurovascular headache disorder:",
      extraSymptoms: ["visual aura", "pulsating headache", "photophobia", "phonophobia", "nausea and vomiting"],
    specialist: "Neurologist"
    },
    {
     name: "Sinusitis",
      description: "This may be an infection or inflammation of the sinus cavities:",
      extraSymptoms: ["purulent nasal discharge", "fever", "congested nose", "pain worsens with bending forward", "pressure in cheeks/forehead"],
      specialist: "ENT (Otolaryngologist)"
    },
    {
        name: "Tension Headache",
        description: "It might be a tension headache. Symptoms include:",
        extraSymptoms: ["dull headache", "tightness around head", "stress", "neck stiffness"],
        specialist: "General Physician"
      }
  ]
},

  {
  keywords: ["shortness of breath", "wheezing", "fatigue", "exercise intolerance", "chest discomfort"],
  conditions: [
    {
      name: "Asthma",
      description: "This could be a chronic inflammatory airway disease:",
      extraSymptoms: ["dry cough", "chest tightness", "nocturnal symptoms", "triggered by allergens or cold air", "improvement with bronchodilators"],
      specialist: "Pulmonologist"
    },
    {
      name: "Heart Problem",
      description: "This may be a cardiac condition causing inadequate blood circulation:",
      extraSymptoms: ["ankle swelling", "orthopnea (trouble breathing while lying down)", "paroxysmal nocturnal dyspnea", "jugular venous distension", "crackles on lung exam"],
      specialist: "Cardiologist"
    }
  ]
},

  {
    keywords: ["stomach", "vomiting", "diarrhea", "nausea"],
    conditions: [
      {
        name: "Gastroenteritis",
        description: "This might be a digestive infection. Symptoms often include:",
        extraSymptoms: ["vomiting", "diarrhea", "stomach cramps", "nausea"],
        specialist: "Gastroenterologist"
      }
    ]
  },
  
  {
    keywords: ["itching", "rash", "redness", "dry skin"],
    conditions: [
      {
        name: "Eczema",
        description: "These symptoms might suggest eczema:",
        extraSymptoms: ["itchy skin", "dry patches", "redness", "skin cracking"],
        specialist: "Dermatologist"
      },
      {
        name: "Allergic Reaction",
        description: "These could be signs of a skin allergy:",
        extraSymptoms: ["itchy rash", "red bumps", "swelling", "irritation"],
        specialist: "Allergist"
      }
    ]
  },
  {
    keywords: ["frequent urination", "thirst", "tired", "blurred vision"],
    conditions: [
      {
        name: "Type 2 Diabetes",
        description: "These could be early signs of Type 2 Diabetes:",
        extraSymptoms: ["frequent urination", "excessive thirst", "fatigue", "blurred vision"],
        specialist: "Endocrinologist"
      },
      {
        name: "Urinary Tract Infection (UTI)",
        description: "It might be a UTI if accompanied by discomfort:",
        extraSymptoms: ["burning urination", "pelvic pain", "cloudy urine", "strong urge to urinate"],
        specialist: "Urologist"
      }
    ]
  },
  {
    keywords: ["dizziness", "fainting", "weak", "low pressure"],
    conditions: [
      {
        name: "Anemia",
        description: "These symptoms may be due to anemia:",
        extraSymptoms: ["fatigue", "pale skin", "dizziness", "shortness of breath"],
        specialist: "Hematologist"
      },
      {
        name: "Hypotension",
        description: "It could be low blood pressure (hypotension):",
        extraSymptoms: ["dizziness", "blurry vision", "fainting", "weakness"],
        specialist: "General Physician"
      }
    ]
  },
  {
    keywords: ["joint pain", "swelling", "morning stiffness"],
    conditions: [
      {
        name: "Rheumatoid Arthritis",
        description: "These are common symptoms of arthritis:",
        extraSymptoms: ["joint stiffness", "swelling", "morning stiffness", "pain in fingers"],
        specialist: "Rheumatologist"
      },
      {
        name: "Osteoarthritis",
        description: "It might be osteoarthritis if pain worsens with activity:",
        extraSymptoms: ["joint pain", "tenderness", "limited motion", "pain after use"],
        specialist: "Orthopedic"
      }
    ]
  },
  {
    keywords: ["anxiety", "panic", "sweating", "nervous"],
    conditions: [
      {
        name: "Generalized Anxiety Disorder",
        description: "You may be experiencing anxiety disorder:",
        extraSymptoms: ["excessive worry", "restlessness", "sweating", "trouble sleeping"],
        specialist: "Psychiatrist"
      },
      {
        name: "Panic Disorder",
        description: "Frequent intense panic may indicate panic disorder:",
        extraSymptoms: ["palpitations", "shortness of breath", "chest discomfort", "feeling of doom"],
        specialist: "Psychologist"
      }
    ]
  },
  {
    keywords: ["burning urination", "pelvic pain", "cloudy urine"],
    conditions: [
      {
        name: "Urinary Tract Infection (UTI)",
        description: "This could indicate a urinary infection:",
        extraSymptoms: ["burning urination", "cloudy urine", "pelvic pain", "strong urgency"],
        specialist: "Urologist"
      },
      {
        name: "Kidney Infection",
        description: "This might be a kidney-related infection:",
        extraSymptoms: ["back pain", "fever", "nausea", "painful urination"],
        specialist: "Nephrologist"
      }
    ]
  },
  {
    keywords: ["weight loss", "fatigue", "increased hunger"],
    conditions: [
      {
        name: "Hyperthyroidism",
        description: "These might be signs of thyroid overactivity:",
        extraSymptoms: ["weight loss", "racing heart", "sweating", "irritability"],
        specialist: "Endocrinologist"
      },
      {
        name: "Type 1 Diabetes",
        description: "Sudden weight loss may relate to Type 1 Diabetes:",
        extraSymptoms: ["frequent urination", "thirst", "weight loss", "blurred vision"],
        specialist: "Endocrinologist"
      }
    ]
  },
  {
    keywords: ["sneezing", "runny nose", "itchy eyes"],
    conditions: [
      {
        name: "Allergic Rhinitis",
        description: "These are typical allergy symptoms:",
        extraSymptoms: ["sneezing", "nasal congestion", "itchy eyes", "runny nose"],
        specialist: "Allergist"
      },
      {
        name: "Common Cold",
        description: "It could be a cold with these symptoms:",
        extraSymptoms: ["sore throat", "runny nose", "mild fever", "cough"],
        specialist: "General Physician"
      }
    ]
  },
  {
    keywords: ["back pain", "numb legs", "shooting pain"],
    conditions: [
      {
        name: "Herniated Disc",
        description: "This may indicate a slipped disc:",
        extraSymptoms: ["lower back pain", "shooting pain", "numbness in legs", "pain with movement"],
        specialist: "Orthopedic Surgeon"
      },
      {
        name: "Sciatica",
        description: "It might be sciatica if the pain radiates down the leg:",
        extraSymptoms: ["radiating leg pain", "burning sensation", "hip pain", "numbness"],
        specialist: "Neurologist"
      }
    ]
  }
];


  let bestMatch = { score: 0, conditions: [] };

  for (const map of mappings) {
    const keywordTokens = map.keywords.flatMap(k => k.split(/\W+/)).map(normalize);
    const score = keywordTokens.filter(k => textWords.includes(k)).length;

    if (score > bestMatch.score) {
      bestMatch = {
        score,
        conditions: map.conditions
      };
    }
  }

  // Fallback if no condition matches
  if (bestMatch.score === 0) {
    return {
      conditions: [
        {
          name: "General illness",
          description: "Symptoms do not match any specific condition. Please consult a doctor.",
          extraSymptoms: [],
          specialist: "Family Doctor"
        }
      ]
    };
  }

  return {
    conditions: bestMatch.conditions
  };
}

module.exports = predictConditionsAndSpecialist;

