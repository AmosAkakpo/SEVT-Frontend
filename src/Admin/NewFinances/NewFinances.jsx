import React, { useEffect, useState } from "react";
import "./NewFinances.css";

function NewFinances() {
  const [branches, setBranches] = useState([]);
  const [finance, setFinance] = useState({
    branchName: "",
    reason: "",
    amount: "",
    dateAdded: "",
    description: ""
  });

  // Load branches from backend
  useEffect(() => {
    fetch("https://sevt-backend.onrender.com/branches")
      .then(res => res.json())
      .then(data => setBranches(data))
      .catch(err => console.error("Error fetching branches:", err));
  }, []);

  // Handle submit
  const handleAddFinance = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://sevt-backend.onrender.com/finances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finance)
      });
      if (res.ok) {
        alert("Finance record added successfully!");
        setFinance({
          branchName: "",
          reason: "",
          amount: "",
          dateAdded: "",
          description: ""
        });
      } else {
        alert("Failed to add finance record");
      }
    } catch (error) {
      console.error("Error adding finance:", error);
    }
  };

  return (
    <div className="nf-wrapper">
      <h2 className="nf-title">Gestion des Finances</h2>

      <form className="nf-form" onSubmit={handleAddFinance}>
        {/* Select Branch */}
        <label>Choisir une branche</label>
        <select
          className="nf-input"
          value={finance.branchName}
          onChange={(e) => setFinance({ ...finance, branchName: e.target.value })}
          required
        >
          <option value="">Sélectionner une branche</option>
          {branches.map(branch => (
            <option key={branch._id} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select>

        {/* Reason */}
        <label>Raison</label>
        <select
          className="nf-input"
          value={finance.reason}
          onChange={(e) => setFinance({ ...finance, reason: e.target.value })}
          required
        >
          <option value="">Sélectionner une raison</option>
          <option value="dépense">Dépense</option>
          <option value="ajout">Ajout</option>
        </select>

        {/* Amount */}
        <label>Montant</label>
        <input
          type="number"
          className="nf-input"
          placeholder="Montant"
          value={finance.amount}
          onChange={(e) => setFinance({ ...finance, amount: e.target.value })}
          required
        />

        {/* Date */}
        <label>Date</label>
        <input
          type="date"
          className="nf-input"
          value={finance.dateAdded}
          onChange={(e) => setFinance({ ...finance, dateAdded: e.target.value })}
          required
        />

        {/* Description */}
        <label>Description</label>
        <textarea
          className="nf-input nf-textarea"
          placeholder="Description"
          value={finance.description}
          onChange={(e) => setFinance({ ...finance, description: e.target.value })}
          required
        />

        <button type="submit" className="nf-btn">Ajouter</button>
      </form>
    </div>
  );
}

export default NewFinances;
