import React, { useEffect, useState } from "react";
import "./NewZones.css";

function NewZones() {
  const [zones, setZones] = useState([]);
  const [newZoneName, setNewZoneName] = useState("");
  const [zoneToDelete, setZoneToDelete] = useState("");

  const backendURL = "https://sevt-backend.onrender.com";

  // Charger toutes les zones
  useEffect(() => {
    fetch(`${backendURL}/zones`)
      .then((res) => res.json())
      .then((data) => setZones(data))
      .catch((err) => console.error(err));
  }, []);

  // Ajouter une zone
  const handleAddZone = async (e) => {
    e.preventDefault();
    const zone = { zoneName: newZoneName, branchList: [] };
    const res = await fetch(`${backendURL}/zones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(zone),
    });

    if (res.ok) {
      alert("Zone ajoutée avec succès ✅");
      setNewZoneName("");
      const refreshed = await fetch(`${backendURL}/zones`);
      setZones(await refreshed.json());
    } else {
      alert("Erreur lors de l’ajout de la zone ❌");
    }
  };

  // Supprimer une zone
  const handleDeleteZone = async (e) => {
    e.preventDefault();
    if (!zoneToDelete) return;

    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette zone ? Toutes les branches associées seront aussi supprimées."
    );
    if (!confirmDelete) return;

    const res = await fetch(`${backendURL}/zones/${zoneToDelete}`, { method: "DELETE" });

    if (res.ok) {
      alert("Zone supprimée avec succès ✅");
      setZoneToDelete("");
      const refreshed = await fetch(`${backendURL}/zones`);
      setZones(await refreshed.json());
    } else {
      alert("Erreur lors de la suppression ❌");
    }
  };

  return (
    <div className="nz-wrapper">
      <h2>Gestion des Zones</h2>

      {/* Tableau des zones */}
      <table className="nz-table">
        <thead>
          <tr>
            <th>Nom de la Zone</th>
            <th>Nombre de Branches</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone._id}>
              <td>{zone.zoneName}</td>
              <td>{zone.branchList?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Ajouter une zone */}
      <div className="nz-section">
        <h3>➕ Ajouter une Zone</h3>
        <form onSubmit={handleAddZone}>
          <input
            type="text"
            placeholder="Nom de la nouvelle zone"
            value={newZoneName}
            onChange={(e) => setNewZoneName(e.target.value)}
            required
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>

      {/* Supprimer une zone */}
      <div className="nz-section">
        <h3>❌ Supprimer une Zone</h3>
        <form onSubmit={handleDeleteZone}>
          <select
            value={zoneToDelete}
            onChange={(e) => setZoneToDelete(e.target.value)}
            required
          >
            <option value="">-- Sélectionnez une zone --</option>
            {zones.map((zone) => (
              <option key={zone._id} value={zone._id}>
                {zone.zoneName}
              </option>
            ))}
          </select>
          <button type="submit">Supprimer</button>
        </form>
      </div>
    </div>
  );
}

export default NewZones;
