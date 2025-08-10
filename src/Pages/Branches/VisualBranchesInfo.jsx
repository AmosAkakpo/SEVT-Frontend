import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VisualBranchesInfo.css"
function VisualBranchesInfo({ zone }) {
  const [branchData, setBranchData] = useState([]);
  const [servicesByBranch, setServicesByBranch] = useState({}); // { branchName: [services] }

  useEffect(() => {
    setBranchData([]);

    async function getBranchData() {
      try {
        const response = await axios.get("https://sevt-backend.onrender.com/branches");

        if (response.status === 200 && Array.isArray(response.data)) {
          const branchNames = Array.isArray(zone.branchList)
            ? zone.branchList
            : zone.branchList?.split(",").map((b) => b.trim());

          const filtered = response.data.filter((branch) =>
            branchNames?.includes(branch.branchName)
          );

          setBranchData(filtered);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    }

    if (zone && zone.branchList?.length > 0) {
      getBranchData();
    }
  }, [zone]);

  useEffect(() => {
    async function fetchServices(branchName) {
      try {
        const response = await axios.get(
          `https://sevt-backend.onrender.com/services/by-branch/${encodeURIComponent(branchName)}`
        );
        if (response.status === 200) {
          setServicesByBranch((prev) => ({
            ...prev,
            [branchName]: response.data,
          }));
        }
      } catch (error) {
        console.error(`Error fetching services for ${branchName}:`, error);
      }
    }

    // Fetch services for each branch found
    branchData.forEach((branch) => {
      fetchServices(branch.branchName);
    });
  }, [branchData]);

  // Helper function to compute difference and color
  function renderAttendanceDifference(services) {
    if (!services || services.length < 2) return null;

    const diff = services[0].numberOfMember - services[1].numberOfMember;
    const color = diff > 0 ? "green" : "red";

    return (
      <div
        style={{
          padding: "8px",
          color: "white",
          backgroundColor: color,
          width: "fit-content",
          borderRadius: "4px",
          marginTop: "8px",
        }}
      >
        {diff > 0
          ? `Augmentation de ${diff} membres`
          : `Diminution de ${Math.abs(diff)} membres`}
      </div>
    );
  }

  return (
    <div className="zone-branches-info">
      <h3>Branches dans la zone: {zone.zoneName}</h3>
      <div className="branch-arrangement">
        {branchData.length > 0 ? (
            branchData.map((branch) => {
            const services = servicesByBranch[branch.branchName] || [];

            return (
                <div key={branch.branchName} style={{ marginBottom: "2rem" }}>
                    <h4>{branch.branchName}</h4>
                        
                    {services.length > 0 ? (
                        <div >
                            {/* Attendance difference box */}
                        {renderAttendanceDifference(services)}
                        <table className="branch-branch-table">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Nombre de membres présents</th>
                            </tr>
                            </thead>
                            <tbody>
                            {services.map((service, i) => (
                                <tr key={i}>
                                <td>{new Date(service.dateCreated).toLocaleDateString()}</td>
                                <td>{service.numberOfMember}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        
                        </div>
                    ) : (
                        <p>Aucun service trouvé pour cette branche.</p>
                    )}
                </div>
            );
            })
        ) : (
            <p>Aucune branche trouvée pour cette zone.</p>
        )}
        </div>
    </div>
  );
}

export default VisualBranchesInfo;
