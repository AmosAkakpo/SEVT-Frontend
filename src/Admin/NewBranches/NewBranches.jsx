import React, { useEffect, useState } from "react";
import "./NewBranches.css";

function NewBranches() {
  const [branches, setBranches] = useState([]);
  const [zones, setZones] = useState([]);

  const [newBranch, setNewBranch] = useState({
    branchName: "",
    branchMainPastor: "",
    branchmptelephone: "",   // <-- NEW
    branchLocation: "",
    branchType: "",
    branchCreationDate: "",
    zoneId: "",
  });

  const [deleteBranchId, setDeleteBranchId] = useState("");
  const [updateBranchId, setUpdateBranchId] = useState("");
  const [updateField, setUpdateField] = useState("branchName");
  const [updateValue, setUpdateValue] = useState("");

  const backendURL = "https://sevt-backend.onrender.com";

  // Charger branches & zones
  useEffect(() => {
    fetch(`${backendURL}/branches`)
      .then(res => res.json())
      .then(data => setBranches(data))
      .catch(err => console.error(err));

    fetch(`${backendURL}/zones`)
      .then(res => res.json())
      .then(data => setZones(data))
      .catch(err => console.error(err));
  }, []);

  // Ajouter une branche
  const handleAddBranch = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${backendURL}/branches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBranch)
      });
      let branchData = await res.json();

      // Mise à jour de la zone
      await fetch(`${backendURL}/zones/${newBranch.zoneId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ $push: { branchList: branchData.insertedId } })
      });

      alert("Branche créée avec succès !");
    } catch (error) {
      console.error(error);
    }
  };

  // Supprimer une branche
  const handleDeleteBranch = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${backendURL}/branches/${deleteBranchId}`, { method: "DELETE" });

      // Retirer la branche de la zone correspondante
      zones.forEach(async (zone) => {
        if (zone.branchList.includes(deleteBranchId)) {
          await fetch(`${backendURL}/zones/${zone._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ $pull: { branchList: deleteBranchId } })
          });
        }
      });

      alert("Branche supprimée !");
    } catch (error) {
      console.error(error);
    }
  };

  // Mettre à jour une branche
  const handleUpdateBranch = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${backendURL}/branches/${updateBranchId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [updateField]: updateValue })
      });

      alert("Branche mise à jour !");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="nb-wrapper">
      <h2>Gestion des Branches</h2>

      {/* Tableau des branches */}
      <div className="nb-section">
        <h3>Liste des branches</h3>
        <table className="nb-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Pasteur Principal</th>
              <th>Téléphone du Pasteur</th> {/* <-- NEW */}
              <th>Localisation</th>
              <th>Type</th>
              <th>Date de Création</th>
            </tr>
          </thead>
          <tbody>
            {branches.map(branch => (
              <tr key={branch._id}>
                <td>{branch.branchName}</td>
                <td>{branch.branchMainPastor}</td>
                <td>{branch.branchmptelephone}</td> {/* <-- NEW */}
                <td>{branch.branchLocation}</td>
                <td>{branch.branchType}</td>
                <td>{branch.branchCreationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ajouter une branche */}
      <div className="nb-section">
        <h3>Ajouter une nouvelle branche</h3>
        <form className="nb-form" onSubmit={handleAddBranch}>
          <label>Zone</label>
          <select onChange={(e) => setNewBranch({ ...newBranch, zoneId: e.target.value })} required>
            <option value="">Sélectionner une zone</option>
            {zones.map(zone => (
              <option key={zone._id} value={zone._id}>{zone.zoneName}</option>
            ))}
          </select>
          <label>Nom de la branche</label>
          <input type="text" onChange={(e) => setNewBranch({ ...newBranch, branchName: e.target.value })} required />
          <label>Pasteur principal</label>
          <input type="text" onChange={(e) => setNewBranch({ ...newBranch, branchMainPastor: e.target.value })} required />
          <label>Téléphone du pasteur</label> {/* <-- NEW */}
          <input type="text" onChange={(e) => setNewBranch({ ...newBranch, branchmptelephone: e.target.value })} required />
          <label>Localisation</label>
          <input type="text" onChange={(e) => setNewBranch({ ...newBranch, branchLocation: e.target.value })} required />
          <label>Type</label>
          <input type="text" onChange={(e) => setNewBranch({ ...newBranch, branchType: e.target.value })} required />
          <label>Date de création</label>
          <input type="date" onChange={(e) => setNewBranch({ ...newBranch, branchCreationDate: e.target.value })} required />
          <button className="nb-btn nb-btn-add" type="submit">Créer</button>
        </form>
      </div>

      {/* Supprimer une branche */}
      <div className="nb-section">
        <h3>Supprimer une branche</h3>
        <form className="nb-form" onSubmit={handleDeleteBranch}>
          <label>Branche</label>
          <select onChange={(e) => setDeleteBranchId(e.target.value)} required>
            <option value="">Sélectionner une branche</option>
            {branches.map(branch => (
              <option key={branch._id} value={branch._id}>{branch.branchName}</option>
            ))}
          </select>
          <button className="nb-btn nb-btn-delete" type="submit">Supprimer</button>
        </form>
      </div>

      {/* Mettre à jour une branche */}
      <div className="nb-section">
        <h3>Mettre à jour une branche</h3>
        <form className="nb-form" onSubmit={handleUpdateBranch}>
          <label>Branche</label>
          <select onChange={(e) => setUpdateBranchId(e.target.value)} required>
            <option value="">Sélectionner une branche</option>
            {branches.map(branch => (
              <option key={branch._id} value={branch._id}>{branch.branchName}</option>
            ))}
          </select>
          <label>Champ à modifier</label>
          <select onChange={(e) => setUpdateField(e.target.value)} required>
            <option value="branchName">Nom de la branche</option>
            <option value="branchMainPastor">Pasteur principal</option>
            <option value="branchmptelephone">Téléphone du Pasteur</option> {/* <-- NEW */}
          </select>
          <label>Nouvelle valeur</label>
          <input type="text" onChange={(e) => setUpdateValue(e.target.value)} required />
          <button className="nb-btn nb-btn-add" type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
}

export default NewBranches;
