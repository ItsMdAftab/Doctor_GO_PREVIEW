// DoctorList.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DoctorList.css";
import hospitalgif from './assets/gif/hospitalgif.gif';


const dummyDoctors = {
  "General Physician": [
    { name: "Dr. Ramesh Verma", qualification: "MBBS, MD", distance: "1.2 km", location: "Apollo Clinic, Kukatpally" },
    { name: "Dr. Anita Rao", qualification: "MBBS, DNB", distance: "2.5 km", location: "KIMS Hospital" },
  ],
  Dermatologist: [
    { name: "Dr. Swathi Reddy", qualification: "MBBS, MD Dermatology", distance: "1.7 km", location: "Oliva Skin Clinic" },
    { name: "Dr. Deepak Kumar", qualification: "MBBS, DDVL", distance: "2.8 km", location: "Skinfinity Clinic" },
  ],
  Pulmonologist: [
    { name: "Dr. Meena Joshi", qualification: "MBBS, MD Pulmonology", distance: "3.1 km", location: "Yashoda Hospitals" },
    { name: "Dr. Rajesh Nair", qualification: "MBBS, DNB Pulmonology", distance: "4.0 km", location: "Medicover Hospitals" },
  ],
  Neurologist: [
    { name: "Dr. Vivek Sharma", qualification: "MBBS, DM Neurology", distance: "2.2 km", location: "Aster Prime Hospital" },
    { name: "Dr. Latha Iyer", qualification: "MBBS, MD, DM", distance: "3.6 km", location: "Care Hospitals" },
  ],
  "ENT (Otolaryngologist)": [
    { name: "Dr. Suresh Kothari", qualification: "MBBS, MS ENT", distance: "1.9 km", location: "Practo ENT Clinic" },
    { name: "Dr. Neha Kulkarni", qualification: "MBBS, DLO", distance: "2.4 km", location: "SR ENT Hospital" },
  ],
  Cardiologist: [
    { name: "Dr. Anil Dhingra", qualification: "MBBS, MD, DM Cardiology", distance: "3.0 km", location: "MaxCure Hospitals" },
    { name: "Dr. Preeti Malhotra", qualification: "MBBS, DNB", distance: "2.6 km", location: "Omega Hospitals" },
  ],
  Gastroenterologist: [
    { name: "Dr. Rohit Agarwal", qualification: "MBBS, DM Gastroenterology", distance: "2.9 km", location: "GastroCare Centre" },
    { name: "Dr. Priya Nair", qualification: "MBBS, MD", distance: "3.3 km", location: "Sunshine Hospitals" },
  ],
  Allergist: [
    { name: "Dr. Tarun Shah", qualification: "MBBS, MD Allergy & Immunology", distance: "1.8 km", location: "Allergy Care India" },
    { name: "Dr. Meenal Joshi", qualification: "MBBS, DNB", distance: "2.0 km", location: "Apollo Specialty Clinic" },
  ],
  Urologist: [
    { name: "Dr. Aditya Menon", qualification: "MBBS, MS, MCh Urology", distance: "2.1 km", location: "Asian Institute of Urology" },
    { name: "Dr. Kavita Deshmukh", qualification: "MBBS, DNB", distance: "3.4 km", location: "Rainbow Hospitals" },
  ],
  Endocrinologist: [
    { name: "Dr. Vikas Reddy", qualification: "MBBS, DM Endocrinology", distance: "1.5 km", location: "Diabetes & Thyroid Clinic" },
    { name: "Dr. Anjali Bose", qualification: "MBBS, MD", distance: "2.7 km", location: "Nova Speciality Centre" },
  ],
  Hematologist: [
    { name: "Dr. Sanjay Rao", qualification: "MBBS, MD, DM Hematology", distance: "3.5 km", location: "NIMS Hospital" },
    { name: "Dr. Renuka Das", qualification: "MBBS, DNB", distance: "2.3 km", location: "CARE Hospitals" },
  ],
  Rheumatologist: [
    { name: "Dr. Manoj Kulkarni", qualification: "MBBS, MD, DM Rheumatology", distance: "2.6 km", location: "Apollo RheumaCare" },
    { name: "Dr. Sneha Bhargava", qualification: "MBBS, DNB", distance: "2.9 km", location: "Rheuma Plus Clinic" },
  ],
  Orthopedic: [
    { name: "Dr. Gaurav Jain", qualification: "MBBS, MS Orthopedics", distance: "2.0 km", location: "Srikara Hospitals" },
    { name: "Dr. Mala Kapoor", qualification: "MBBS, D.Ortho", distance: "3.2 km", location: "Care Ortho Centre" },
  ],
  Psychiatrist: [
    { name: "Dr. Ashwin Raj", qualification: "MBBS, MD Psychiatry", distance: "1.4 km", location: "Mindspace Clinic" },
    { name: "Dr. Jyoti Batra", qualification: "MBBS, DPM", distance: "2.3 km", location: "Mental Wellness Centre" },
  ],
  Psychologist: [
    { name: "Dr. Nikhil Chopra", qualification: "MA, MPhil Clinical Psychology", distance: "1.9 km", location: "InnerLight Clinic" },
    { name: "Dr. Shruti Mehra", qualification: "PhD Psychology", distance: "2.8 km", location: "Samarth Wellness" },
  ],
  Nephrologist: [
    { name: "Dr. Alok Singh", qualification: "MBBS, DM Nephrology", distance: "2.7 km", location: "Kidney Care Clinic" },
    { name: "Dr. Leena Bansal", qualification: "MBBS, MD, DNB", distance: "3.1 km", location: "AIG Hospitals" },
  ],
  "Orthopedic Surgeon": [
    { name: "Dr. Vimal Patel", qualification: "MBBS, MS Ortho, MCh", distance: "2.5 km", location: "Apollo Spectra Hospitals" },
    { name: "Dr. Tanya Raj", qualification: "MBBS, DNB Orthopedics", distance: "3.0 km", location: "Spine Plus Ortho Center" },
  ]
};

export default function DoctorList() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const specialist = state?.specialist || "General Physician";
  const doctors = dummyDoctors[specialist] || [];

  return (
    <div className="page-wrapper doctor-page">
      <h2 className="headername">Nearby {specialist}s in Dundigal</h2>
      {/*<img className="imagedoctor"src={hospitalgif} alt="" />*/}
    <div className="doctor-details">
        {doctors.length > 0 ? (
        doctors.map((doc, idx) => (
          <div key={idx} className="condition-card">
            <h3>{doc.name}</h3>
            <p><strong>Qualification:</strong> {doc.qualification}</p>
            <p><strong>Clinic:</strong> {doc.location}</p>
            <p><strong>Distance:</strong> {doc.distance}</p>
            <a
  href={`https://www.google.com/maps/dir/IARE+Engineering+Workshop,+Gundlapochampalli,+Domara+Pocham+Pally,+Telangana/${encodeURIComponent(doc.location)}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="navigate-btn">🗺️ Navigate</button>
</a>
          </div>
        ))
      ) : (
        <p>No nearby {specialist}s found.</p>
      )}

    </div>
      
      <button className="backbutton"onClick={() => navigate("/")}>← Back to Symptom Checker</button>
    </div>
  );
}
