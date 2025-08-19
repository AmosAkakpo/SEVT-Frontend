import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Finance.css';

function Finance() {
  const [finances, setFinances] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("Toutes les branches");

  const backendURL = "https://sevt-backend.onrender.com";

  // Fetch all finances
  const fetchFinances = async () => {
    const response = await axios.get(`${backendURL}/finances`);
    setFinances(response.data);
  };

  // Fetch all branches from branch routes
  const fetchBranches = async () => {
    const response = await axios.get(`${backendURL}/branches`);
    // Map to branch names only
    const branchNames = response.data.map(branch => branch.branchName);
    setBranches(branchNames);
  };

  useEffect(() => {
    fetchFinances();
    fetchBranches();
  }, []);

  const filteredFinances =
    selectedBranch === "Toutes les branches"
      ? finances
      : finances.filter(f => f.branchName === selectedBranch);

  // Download visible table as CSV
  const downloadCSV = () => {
    const csvRows = [
      ["Branch Name", "Reason", "Amount", "Date Added", "Description"],
      ...filteredFinances.map(item => [
        item.branchName,
        item.reason,
        item.amount,
        item.dateAdded,
        item.description
      ])
    ];

    const csvContent = csvRows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "finance_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='finance-wrapper'>
      <h2>Résumé Finances</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Choisir une branche: </label>
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
          <option>Toutes les branches</option>
          {branches.map((branch, i) => (
            <option key={i} value={branch}>{branch}</option>
          ))}
        </select>

        <button className='finance-download-button' onClick={downloadCSV}>Télécharger</button>
      </div>

      <table className="finance-table">
        <thead>
          <tr>
            <th>Branches</th>
            <th>Raison</th>
            <th>Montant (FCFA)</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
  {selectedBranch === "Toutes les branches"
    ? finances.map((item, index) => (
        <tr key={index}>
          <td>{item.branchName}</td>
          <td>{item.reason}</td>
          <td>{item.amount}</td>
          <td>{item.dateAdded}</td>
          <td>{item.description}</td>
        </tr>
      ))
    : filteredFinances.length > 0
      ? filteredFinances.map((item, index) => (
          <tr key={index}>
            <td>{item.branchName}</td>
            <td>{item.reason}</td>
            <td>{item.amount}</td>
            <td>{item.dateAdded}</td>
            <td>{item.description}</td>
          </tr>
        ))
      : (
        <tr>
          <td colSpan="5" style={{ textAlign: "center" }}>Pas d'information</td>
        </tr>
      )
  }
</tbody>

      </table>
    </div>
  );
}

export default Finance;
