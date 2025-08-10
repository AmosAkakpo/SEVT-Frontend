import React from 'react'
import { useEffect,useState } from 'react'
import "./Branches.css"
import axios  from "axios"

import VisualZones from './visualZones'
import VisualBranchesInfo from './visualBranchesInfo'

const Branches = () => {
  const [selectedZone, setSelectedZone] = useState(null);

  return (
    <div className="branches-page-wrapper">
      <VisualZones onZoneSelect={(zone) => setSelectedZone(zone)} />

      {selectedZone && (
        <div className="zone-details">
          <h2>Détails pour la zone: {selectedZone.zoneName}</h2>
          <VisualBranchesInfo zone = {selectedZone}/>
        </div>
      )}
    </div>
  );
};

export default Branches