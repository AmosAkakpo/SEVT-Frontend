import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VisualZones.css'; 

function VisualZones({ onZoneSelect }) {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    async function grabZones() {
      const response = await axios.get("https://sevt-backend.onrender.com/zones");
      if (response.status === 200) {
        setZones(response.data);
      }
    }
    grabZones();
  }, []);

  const activeZones = zones.filter(zone => zone.branchList && zone.branchList.length > 0);
  const inactiveZones = zones.filter(zone => !zone.branchList || zone.branchList.length === 0);

  return (
    <div className="zone-container">
      <h1>Notre Expansion Stratégique</h1>
      <p>
        Dans le but d’étendre notre portée et de toucher un plus grand nombre d’âmes, nous ciblons actuellement plusieurs zones clés.
        Ci-dessous, vous pouvez découvrir les zones où nous sommes déjà établis ainsi que celles que nous espérons bientôt atteindre.
      </p>
      <div className="zone-grid">
        <div className="zone-column active-zone">
          <h2>Zones Établies ✅</h2>
          <ul>
            {activeZones.map((zone, index) => (
              <li key={index} onClick={() => onZoneSelect(zone)} style={{ cursor: 'pointer' }}>
                {zone.zoneName}
              </li>
            ))}
          </ul>
        </div>
        <div className="zone-column inactive-zone">
          <h2>Zones Ciblées 🚧</h2>
          <ul>
            {inactiveZones.map((zone, index) => (
              <li key={index} onClick={() => onZoneSelect(zone)} style={{ cursor: 'pointer' }}>
                {zone.zoneName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VisualZones;
