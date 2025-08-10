import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Finance.css'
function Finance() {
  const [finances, setFinances] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("Toutes les branches");

  // Fetch finance data
  const fetchFinances = async () => {
    const response = await axios.get("https://sevt-backend.onrender.com/finances");
    setFinances(response.data);
  };

  // Fetch unique branches
  const fetchBranches = async () => {
    const response = await axios.get("https://sevt-backend.onrender.com/finances/branches");
    setBranches(response.data);
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
      <h2>Resume Finances</h2>

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
            <th>Branch</th>
            <th>Reason</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredFinances.map((item, index) => (
            <tr key={index}>
              <td>{item.branchName}</td>
              <td>{item.reason}</td>
              <td>{item.amount}</td>
              <td>{item.dateAdded}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Finance;
