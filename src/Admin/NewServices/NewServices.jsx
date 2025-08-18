import React, { useEffect, useState } from "react";
import "./NewServices.css";

function NewServices() {
  const [branches, setBranches] = useState([]);
  const [service, setService] = useState({
    branchName: "",
    dateCreated: "",
    numberOfMember: ""
  });

  // Load branches from backend
  useEffect(() => {
    fetch("https://sevt-backend.onrender.com/branches")
      .then(res => res.json())
      .then(data => setBranches(data))
      .catch(err => console.error("Error fetching branches:", err));
  }, []);

  // Handle submit
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://sevt-backend.onrender.com/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service)
      });

      if (res.ok) {
        alert("Service added successfully!");
        setService({
          branchName: "",
          dateCreated: "",
          numberOfMember: ""
        });
      } else {
        alert("Failed to add service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="ns-wrapper">
      <h2 className="ns-title">Gestion des Services</h2>

      <form className="ns-form" onSubmit={handleAddService}>
        {/* Branch Selection */}
        <label>Choisir une branche</label>
        <select
          className="ns-input"
          value={service.branchName}
          onChange={(e) => setService({ ...service, branchName: e.target.value })}
          required
        >
          <option value="">Sélectionner une branche</option>
          {branches.map(branch => (
            <option key={branch._id} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select>

        {/* Date */}
        <label>Date du service</label>
        <input
          type="date"
          className="ns-input"
          value={service.dateCreated}
          onChange={(e) => setService({ ...service, dateCreated: e.target.value })}
          required
        />

        {/* Number of members */}
        <label>Nombre de participants</label>
        <input
          type="number"
          className="ns-input"
          placeholder="Nombre de participants"
          value={service.numberOfMember}
          onChange={(e) => setService({ ...service, numberOfMember: e.target.value })}
          required
        />

        <button type="submit" className="ns-btn">Ajouter</button>
      </form>
    </div>
  );
}

export default NewServices;
